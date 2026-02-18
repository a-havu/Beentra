import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { registerSchema } from "@/lib/validation";
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body); // validate the incoming data against the shared schema
    if (!result.success) {
      console.error("Validation errors:", result.error.issues);
      return NextResponse.json({ error: "Invalid input", details: result.error.issues }, { status: 400 });
    }
    const validatedData = result.data; // this is the validated data

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    // prevent duplicate username
    const existingUsername = await prisma.user.findUnique({
      where: { username: validatedData.username }
    });

    if (existingUsername) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }
    const existingPhone = await prisma.user.findUnique({
      where: { phone: validatedData.phone }
    });
    if (existingPhone) {
      return NextResponse.json({ error: "Phone number already exists" }, { status: 409 });
    }
    // hash the password before storing
    // const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // create new user in the database
    // const newUser = await prisma.user.create({
    //     data: {
    //         fname: validatedData.fname,
    //         lname: validatedData.lname,
    //         username: validatedData.username,
    //         phone: validatedData.phone,
    //         email: validatedData.email,
    //         passwordHash: hashedPassword, // store the hashed password
    //     }
    // });

    // Let Better Auth handle user creation and password hashing
    const newUser = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        name: `${validatedData.fname} ${validatedData.lname}`,
        // extra fields
        fname: validatedData.fname,
        lname: validatedData.lname,
        username: validatedData.username,
        phone: validatedData.phone,
      },
      asResponse: true,
    })

    return newUser;




  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
