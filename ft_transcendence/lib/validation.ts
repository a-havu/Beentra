import { z } from "zod";

export function validateEnv() {
  //variables must be defined in env file
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  const requiredEnvVars = [
    "JWT_SECRET",
    "SALT_ROUNDS",
    "DATABASE_URL",
    "NEXT_PUBLIC_URL",
    "AUTH_SECRET",
    "AUTH_GITHUB_ID",
    "AUTH_GITHUB_SECRET",
    "AUTH_GOOGLE_ID",
    "AUTH_GOOGLE_SECRET",
    "FORTY_TWO_CLIENT_ID",
    "FORTY_TWO_CLIENT_SECRET",
    "FORTY_TWO_REDIRECT_URI",
    "GMAIL_USER",
    "GMAIL_APP_PASSWORD",
    "NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY",
    "NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT",
    "IMAGEKIT_PRIVATE_KEY",
  ];

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
  date: z.coerce
    .date()
    .refine((d) => !isNaN(d.getTime()), "Invalid date")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date must be today or in the future",
    )
    .max(new Date("2100-12-31"), "Date must be before 2101"),
  timeFrom: z.string().regex(timeRegex, "Invalid time format"),
  timeTo: z.string().regex(timeRegex, "Invalid time format"),
  location: z
    .string()
    .min(2, "Location too short")
    .max(30, "Location too long"),
  organizer: z
    .string()
    .min(2, "Organizer too short")
    .max(30, "Organizer too long"),
  type: z.enum(["Student", "External"]),
  description: z.string().optional(),
  maxSpots: z.coerce
    .number()
    .int()
    .min(0, "Spots must be 0 or more")
    .default(0),
});

// Frontend schema — image is handled outside zod (uploaded client-side before submit)
export const eventSchema = eventSchemaBase
  .extend({
    image: z.string().nullable().optional(),
  })
  .refine((data) => data.date >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: "Date cannot be in the past",
    path: ["date"],
  })
  .refine((data) => data.timeTo > data.timeFrom, {
    message: "End time must be after start time",
    path: ["timeTo"],
  });

// Backend schema — image is a URL string
export const eventSchemaServer = eventSchemaBase
  .extend({
    image: z.string().nullable().optional(),
    creatorId: z.string().optional(),
    publicCreatorId: z.string().optional(),
  })
  .refine((data) => data.date >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: "Date cannot be in the past",
    path: ["date"],
  })
  .refine((data) => data.timeTo > data.timeFrom, {
    message: "End time must be after start time",
    path: ["timeTo"],
  });

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
    avatarUrl: z.string().optional(),
    fullName: z.string().min(2, "Full name is required").optional(),
    username: z
      .string()
      .min(3, "Min. 3 characters")
      .max(20, "Max. 20 characters")
      .optional(),
    email: z.string().email("Invalid email").optional(),
    password: z
      .union([z.string().min(8, "Min. 8 characters"), z.literal("")])
      .optional(),
    confirm: z.string().optional(),
    role: z.enum(["admin", "user", "moderator"]).optional(),
  })
  .refine((data) => !data.password || data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, "Project name too short")
    .max(35, "Project name too long"),
  oneLiner: z
    .string()
    .min(2, "One-liner too short")
    .max(80, "One-liner too long"),
  link: z
    .string()
    .max(100, "Link too long")
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  techStack: z
    .string()
    .max(50, "Tech stack description too long")
    .optional(),
  description: z
    .string()
    .max(2000, "Description too long")
    .optional(),
  image: z.string().nullable().optional(),
});
