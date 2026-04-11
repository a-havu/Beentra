import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { idSchema, updateUserSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { createToken, getSession } from "@/lib/auth";
import { cookies } from "next/headers";

// Get data from single user based on ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const validation = idSchema.safeParse({ id });
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid ID", details: validation.error.issues },
        { status: 400 },
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: validation.data.id },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        role: true,
        twoFactorEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ----------------------------------------------------------------------------------- */

// Update a user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idValidation = idSchema.safeParse({ id });
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid ID", details: idValidation.error.issues },
        { status: 400 },
      );
    }

    const body = await request.json();
    const bodyValidation = updateUserSchema.safeParse(body);
    if (!bodyValidation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: bodyValidation.error.issues },
        { status: 400 },
      );
    }

    const { confirm: _, password, ...fields } = bodyValidation.data;
    const updateData: Record<string, unknown> = { ...fields };

    if (password) {
      const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
      updateData.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: idValidation.data.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: idValidation.data.id },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Refresh the JWT cookie so the header avatar updates immediately
    const session = await getSession();
    if (session && session.userId === idValidation.data.id) {
      const newToken = await createToken({
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar_url: updatedUser.avatarUrl ?? null,
      });
      const cookieStore = await cookies();
      cookieStore.set("auth-token", newToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ----------------------------------------------------------------------------------- */

// DELETE a user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const validation = idSchema.safeParse({ id });
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid ID", details: validation.error.issues },
        { status: 400 },
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: validation.data.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

     // Prevent deleting admin users
     if (user.role === "admin") {
       return NextResponse.json(
         { error: "Cannot delete admin users" },
         { status: 403 },
       );
     }

    // Delete the user
    await prisma.user.delete({
      where: { id: validation.data.id },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
