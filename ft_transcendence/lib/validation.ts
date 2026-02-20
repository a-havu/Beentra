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

export const registerSchema = z
  .object({
    fname: z.string().min(2, "Required field"),
    lname: z.string().min(2, "Required field"),
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
