import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Get data from single user based on their ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = parseInt(params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
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
  { params }: { params: { id: string } },
) {
  try {
    const userId = parseInt(params.id);
    const body = await request.json();
    const { name, email, password, role } = body;

    const updateData: any = {};

    if (email) updateData.email = email;
    if (role) updateData.role = role;

    if (password) {
      const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
      updateData.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    });

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
  { params }: { params: { id: string } },
) {
  try {
    const userId = parseInt(params.id);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
      where: { id: userId },
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
