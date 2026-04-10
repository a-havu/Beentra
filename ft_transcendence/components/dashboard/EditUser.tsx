
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// ─── Schema ───────────────────────────────────────────────────────────────────

const editUserSchema = z
  .object({
    fullName: z.string().optional(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .optional(),
    email: z.string().email("Invalid email").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
    confirm: z.string().optional().or(z.literal("")),
    role: z.enum(["admin", "user"]).optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== data.confirm) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirm"],
    },
  );

type FormFields = z.infer<typeof editUserSchema>;

// ─── Types ────────────────────────────────────────────────────────────────────

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  isOnline: boolean;
};

type Props = {
  user: User;
  isOAuth?: boolean;
  onSuccess?: (updatedUser: User) => void;
  onCancel?: () => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

// Avatar preset images have been removed.

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditUser({
  user,
  isOAuth = false,
  onSuccess,
  onCancel,
}: Props) {
  const [serverError, setServerError] = useState("");
  const [pendingAvatar, setPendingAvatar] = useState<string | undefined>(
    user.avatarUrl ?? undefined,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: user.fullName ?? "",
      username: user.username,
      email: user.email,
      password: "",
      confirm: "",
      role: user.role as "admin" | "user",
    },
  });

  async function onSubmit(data: FormFields) {
    setServerError("");

    // Build payload with only filled fields
    const payload: Record<string, any> = {};
    if (pendingAvatar !== undefined) payload.avatarUrl = pendingAvatar;
    if (data.fullName) payload.fullName = data.fullName;
    if (data.username) payload.username = data.username;
    if (data.email) payload.email = data.email;
    if (data.password) {
      payload.password = data.password;
      payload.confirm = data.confirm;
    }
    if (data.role) payload.role = data.role;

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

      onSuccess?.(result);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#6229FF]/20 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
      </div>

      {/* Scrollable form body */}
      <div className="flex flex-col gap-4 overflow-y-auto pr-1 max-h-[60vh]">
        {isOAuth ? (
          /* OAuth users: role only */
          <div className="flex flex-col gap-4">
            <p className="text-s text-gray-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              This user signed in through Github or Intra 42, only their role
              can be changed.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                User Role
              </label>
              <select
                {...register("role")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6229FF] focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ) : (
          <>
            {/* Personal information */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6229FF]/70 whitespace-nowrap">
                  Personal Information
                </span>
                <div className="flex-1 h-px bg-[#6229FF]/30" />
              </div>
              <Input
                label="Full Name"
                name="fullName"
                id="fullName"
                type="text"
                placeholder="User's full name"
                register={register}
                errors={errors}
              />
              <Input
                label="Username"
                name="username"
                id="username"
                type="text"
                placeholder="User's username"
                register={register}
                errors={errors}
              />
              <Input
                label="Email"
                name="email"
                id="email"
                type="email"
                placeholder="user@example.com"
                register={register}
                errors={errors}
              />
            </div>

            {/* Role selection */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6229FF]/70 whitespace-nowrap">
                  Role
                </span>
                <div className="flex-1 h-px bg-[#6229FF]/30" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  User Role
                </label>
                <select
                  {...register("role")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6229FF] focus:border-transparent"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Password change */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6229FF]/70 whitespace-nowrap">
                  Security
                </span>
                <div className="flex-1 h-px bg-[#6229FF]/30" />
              </div>
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
            </div>
          </>
        )}

        {/* Server error */}
        {serverError && (
          <div className="flex items-center gap-2 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm px-4 py-2">
            <span className="font-semibold">Error:</span>
            <span>{serverError}</span>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-3 border-t border-[#6229FF]/20 pt-4">
        <Button
          variant="edit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
		<Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
