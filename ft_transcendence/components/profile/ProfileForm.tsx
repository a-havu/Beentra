"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { updateUserSchema } from "@/lib/validation";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Twofa from "@/components/login/Twofa";
import type { Prisma } from "@/lib/generated/prisma";

type FormFields = z.infer<typeof updateUserSchema>;

type UserData = Omit<
  Prisma.UserGetPayload<{
    select: {
      id: true;
      fullName: true;
      username: true;
      email: true;
      phone: true;
      role: true;
      twoFactorEnabled: true;
      avatarUrl: true;
      createdAt: true;
    };
  }>,
  "createdAt"
> & { createdAt: string };

interface ProfileFormProps {
  user: UserData;
  isOwner: boolean;
}

export default function ProfileForm({ user, isOwner }: ProfileFormProps) {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: user.fullName ?? "",
      username: user.username,
      email: user.email,
      phone: user.phone ?? "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(data: FormFields) {
    setServerError("");
    setSuccess(false);

    // Only send fields that have values
    const payload: Record<string, string> = {};
    if (data.fullName) payload.fullName = data.fullName;
    if (data.username) payload.username = data.username;
    if (data.email) payload.email = data.email;
    if (data.phone) payload.phone = data.phone;
    if (data.password) {
      payload.password = data.password;
      payload.confirm = data.confirm ?? "";
    }

    try {
      const response = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setServerError(result.error || "Update failed");
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="beentra-form-container gap-8 py-10">
      {/* Info Card */}
      <div className="beentra-form">
        <div className="flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-3 text-gray-800">
          <div className="flex gap-2">
            <span className="font-semibold">Full Name:</span>
            <span>{user.fullName || "—"}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Phone:</span>
            <span>{user.phone || "—"}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Role:</span>
            <span className="capitalize">{user.role}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Member since:</span>
            <span>{memberSince}</span>
          </div>
          </div>
          <Image
            src={user.avatarUrl || "/default-profile-picture.jpg"}
            alt={`${user.username}'s avatar`}
            width={64}
            height={64}
            className="rounded-full object-cover shrink-0"
          />
        </div>
      </div>

      {/* Edit Form — owner only */}
      {isOwner && (
        <div className="beentra-form">
          <h2>Edit Profile</h2>

          <Input
            label="Full Name"
            name="fullName"
            id="fullName"
            type="text"
            placeholder="Your full name"
            register={register}
            errors={errors}
          />

          <Input
            label="Username"
            name="username"
            id="username"
            type="text"
            placeholder="Your username"
            register={register}
            errors={errors}
          />

          <Input
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="name@example.com"
            register={register}
            errors={errors}
          />

          <Input
            label="Phone"
            name="phone"
            id="phone"
            type="tel"
            placeholder="+358 40 123 4567"
            register={register}
            errors={errors}
          />

          <Input
            label="New Password"
            name="password"
            id="password"
            type="password"
            placeholder="Leave blank to keep current"
            register={register}
            errors={errors}
          />

          <Input
            label="Confirm Password"
            name="confirm"
            id="confirm"
            type="password"
            placeholder="Repeat new password"
            register={register}
            errors={errors}
          />

          {serverError && (
            <p className="text-sm text-red-500">{serverError}</p>
          )}
          {success && (
            <p className="text-sm text-green-600">Profile updated!</p>
          )}

          <Button
            variant="edit"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      )}

      {/* 2FA Section — owner only */}
      {isOwner && (
        <div className="beentra-form">
          <h2>Two-Factor Authentication</h2>
          <Twofa status={user.twoFactorEnabled} />
        </div>
      )}
    </div>
  );
}
