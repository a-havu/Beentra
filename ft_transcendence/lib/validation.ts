import { z } from "zod";

export function validateEnv() {
  //variables must be defined in env file
  const requiredEnvVars = ["JWT_SECRET", "SALT_ROUNDS", "DATABASE_URL"];

  //the missing variables will be stored here
  const missingVars: string[] = [];

  requiredEnvVars.forEach((envVar) => {
    const value = process.env[envVar];
    if (!value || value.trim() === "") {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    console.error("❌ Missing environment variables:");
    missingVars.forEach((v) => console.error(`   - ${v}`));
    console.error("\n✅ Add these to your .env file and restart the server");
    process.exit(1);
  }

  if (process.env.SALT_ROUNDS) {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    if (isNaN(saltRounds) || !Number.isInteger(saltRounds) || saltRounds <= 0) {
      console.error("❌ SALT_ROUNDS must be a positive integer");
      process.exit(1);
    }
  }

  console.log("✅ Environment variables validated successfully");
}

// New user sign-up — all fields required, confirm must match password
export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    username: z
      .string()
      .min(3, "Min. 3 characters")
      .max(20, "Max. 20 characters"),
    phone: z.string().regex(/^\+?[\d\s]{7,15}$/, "Invalid phone number"),
    date: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          const now = new Date();
          return date < now;
        },
        { message: "invalid date" },
      ),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Min. 8 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });


const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Shared base fields — no image, no refinements (so .extend() works on both schemas)
const eventSchemaBase = z.object({
  title: z.string().min(2, "Title too short").max(30, "Title too long"),
  date: z.coerce.date(),
  timeFrom: z.string().regex(timeRegex, "Invalid time format"),
  timeTo: z.string().regex(timeRegex, "Invalid time format"),
  location: z.string().min(2, "Location too short").max(30, "Location too long"),
  organizer: z.string().min(2, "Organizer too short").max(30, "Organizer too long"),
  type: z.enum(["Student", "External"]),
  description: z.string().optional(),
  maxSpots: z.coerce.number().int().min(0, "Spots must be 0 or more").default(0),
});

// Frontend schema — image is a FileList (browser File object)
export const eventSchema = eventSchemaBase
  .extend({
    image: (z.custom<FileList>())
      .optional()
      .refine(
        (file) => !file || file.length === 0 || file[0]?.size <= 1_000_000,
        "Image file must be smaller than 1MB"
      )
      .refine(
        (file) =>
          !file ||
          file.length === 0 ||
          ["image/jpeg", "image/png", "image/webp"].includes(file[0]?.type),
        "Only JPG, PNG, WEBP allowed"
      ),
  })
  .refine(
    (data) => data.date >= new Date(new Date().setHours(0, 0, 0, 0)),
    { message: "Date cannot be in the past", path: ["date"] }
  )
  .refine(
    (data) => data.timeTo > data.timeFrom,
    { message: "End time must be after start time", path: ["timeTo"] }
  );


export const projectSchema = z.object({
  projectName: z.string().min(2, "Project name too short").max(50, "Project name too long"),
  oneLiner: z.string().min(2, "One-liner too short").max(100, "One-liner too long"),
  link: z.string().optional(),
  techStack: z.string().optional(),
  description: z.string().optional(),
});
// Backend schema — image is a URL string
export const eventSchemaServer = eventSchemaBase
  .extend({
    image: z.string().nullable().optional(),
    creatorId: z.string().optional(),
  })
  .refine(
    (data) => data.date >= new Date(new Date().setHours(0, 0, 0, 0)),
    { message: "Date cannot be in the past", path: ["date"] }
  )
  .refine(
    (data) => data.timeTo > data.timeFrom,
    { message: "End time must be after start time", path: ["timeTo"] }
  );

export const subscribeSchema = z.object({
  eventId: z.string().min(1, "Event ID required"),
  userId: z.string().min(1, "User ID required"),
});

// Validates a route param ID (e.g. /api/user/[id])
export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

// Updating an existing user — all fields optional, confirm only required if password is provided
export const updateUserSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required").optional(),
    username: z
      .string()
      .min(3, "Min. 3 characters")
      .max(20, "Max. 20 characters")
      .optional(),
    phone: z
      .string()
      .regex(/^\+?[\d\s]{7,15}$/, "Invalid phone number")
      .optional(),
    email: z.string().email("Invalid email").optional(),
    password: z.string().min(8, "Min. 8 characters").optional(),
    confirm: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
