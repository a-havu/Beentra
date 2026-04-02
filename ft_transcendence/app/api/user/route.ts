import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { NowIndicatorContainer } from "@fullcalendar/core/internal";

// create a user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body); // validate the incoming data against the shared schema
    if (!result.success) {
      console.error("Validation errors:", result.error.issues);
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 },
      );
    }
    const validatedData = result.data; // this is the validated data

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    // prevent duplicate username
    const existingUsername = await prisma.user.findUnique({
      where: { username: validatedData.username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 },
      );
    }
    // hash the password before storing
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // create new user in the database
    const newUser = await prisma.user.create({
      data: {
        fullName: validatedData.fullName,
        username: validatedData.username,
        email: validatedData.email,
        passwordHash: hashedPassword, // store the hashed password
      },
    });

    console.log("User created:", newUser.id);
    return NextResponse.json(
      {
        message: "Registration successful",
        data: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 },
    );
  }
}

/* ----------------------------------------------------------------------------------- */

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastActive: true,
        passwordHash: false,
        username: true,
        fullName: true,
        isOnline: true,
        oauthAccount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // const currTime = new Date();
    // const stillOnlineTime = 5 * 60 * 1000; // 5 minutes in milliseconds

    // const activeUsers = users.map((user) => {
    //   if (!user.lastActive) {
    //     return { ...user, isOnline: false };
    //   }

    //   const timeSinceActive =
    //     currTime.getTime() - new Date(user.lastActive).getTime();
    //   const isOnline = timeSinceActive < stillOnlineTime;

    //   return { ...user, isOnline };
    // });  REMOVE

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ----------------------------------------------------------------------------------- */
