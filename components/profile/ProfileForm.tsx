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
import ProfileCard from "@/components/profile/ProfileCard";
import type { Prisma } from "@/lib/generated/prisma/client";
import { uploadImage } from "@/lib/uploadImage";
import ProjectCard from "@/components/projects/ProjectCard";
import { LocalProject } from "@/types/general";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormFields = z.infer<typeof updateUserSchema>;

// Shape of user data passed from the server component (page.tsx)
type UserData = Omit<
  Prisma.UserGetPayload<{
    select: {
      id: true;
      fullName: true;
      username: true;
      email: true;
      role: true;
      twoFactorEnabled: true;
      avatarUrl: true;
      createdAt: true;
    };
  }>,
  "createdAt"
> & { createdAt: string }; // createdAt serialized as ISO string for client

interface ProfileFormProps {
  user: UserData;
  isOwner: boolean;
  projects: LocalProject[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfileForm({
  user,
  isOwner,
  projects,
}: ProfileFormProps) {
  // Modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  const [twoFaOpen, setTwoFaOpen] = useState(false);

  // Form feedback
  const [serverError, setServerError] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Avatar upload
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Saved avatar — shown in the profile header, only updates after a successful save
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarUrl ?? "");
  // Pending avatar — tracks picker selection inside the modal before saving
  const [pendingAvatar, setPendingAvatar] = useState(user.avatarUrl ?? "");

  // ── Form setup ──────────────────────────────────────────────────────────────

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
      password: "",
      confirm: "",
    },
  });

  // ── Avatar upload ───────────────────────────────────────────────────────────

  async function handleAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploadingAvatar(true);
    try {
      const url = await uploadImage(file);
      setPendingAvatar(url);
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  }

  // ── Submit handler ──────────────────────────────────────────────────────────

  async function onSubmit(data: FormFields) {
    setServerError("");

    // Only include fields that have a value to avoid overwriting with empty strings
    const payload: Record<string, string> = {};
    payload.avatarUrl = pendingAvatar;
    if (data.fullName) payload.fullName = data.fullName;
    if (data.username) payload.username = data.username;
    if (data.email) payload.email = data.email;
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
      setSelectedAvatar(pendingAvatar); // commit the avatar only on successful save
      setModalOpen(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex flex-col gap-6">
      {/* ── Profile Header Card ─────────────────────────────────────────────── */}
      <ProfileCard className="overflow-hidden">
        {/* Decorative gradient banner */}
        <div className="h-24 bg-linear-to-r from-[#FFEAD8] via-[#91d3e2] to-[#FBFFCD]" />

        <div className="px-6 pb-6 pt-3">
          {/* Avatar (overlaps banner via negative margin) + action buttons */}
          <div className="flex items-start justify-between mt-2 mb-3">
            <div className="ring-4 ring-white rounded-full shrink-0 -mt-12">
              {selectedAvatar ? (
                <Image
                  src={selectedAvatar}
                  alt={`${user.username}'s avatar`}
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-24 h-24"
                />
              ) : (
                <Image
                  src="/default-profile-picture.jpg"
                  alt="Default avatar"
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-24 h-24"
                />
              )}
            </div>

            <div className="flex items-center gap-6 pb-1">
              {/* Shown briefly after a successful save */}
              {savedSuccess && (
                <div className="flex items-center gap-1.5 rounded-lg bg-green-100 border border-green-300 text-green-700 text-xs px-3 py-1.5">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profile updated!
                </div>
              )}
              {/* Only the profile owner can edit */}
              {isOwner && (
                <Button
                  variant="edit"
                  size="small"
                  onClick={() => {
                    setServerError("");
                    setPendingAvatar(selectedAvatar);
                    setModalOpen(true);
                  }}
                >
                  Edit profile
                </Button>
              )}
            </div>
          </div>

          {/* Name, username, role badge, and contact metadata */}
          <div className="flex flex-col gap-1">
            {user.fullName && (
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {user.fullName}
              </h1>
            )}
            <p className="text-gray-500 text-sm">@{user.username}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              {/* Role badge — purple for admin, gray for regular users */}
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${
                  user.role === "admin"
                    ? "bg-[#cdceff] text-[#6229FF]"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {user.role}
              </span>

              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <svg
                  className="w-3.5 h-3.5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {user.email}
              </span>

              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <svg
                  className="w-3.5 h-3.5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Joined {memberSince}
              </span>
            </div>
          </div>
        </div>
      </ProfileCard>

      {/* ── Bottom Cards ─────────────────────────────────────────────────────── */}
      {isOwner && (
        <div className="w-full">
          {/* 2FA Card — owner only; clicking opens the 2FA modal */}
          {isOwner && (
            <ProfileCard onClick={() => setTwoFaOpen(true)}>
              <div className="flex items-start justify-between px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#6229FF]/10 shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[#6229FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm leading-tight">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Protect your account with an extra verification step.
                    </p>
                  </div>
                </div>
                {/* Status badge */}
                <span
                  className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    user.twoFactorEnabled
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-white text-gray-400 border-gray-200"
                  }`}
                >
                  {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </ProfileCard>
          )}
        </div>
      )}

      {/* ── Projects ────────────────────────────────────────────────────────── */}
      {!isOwner && projects.length > 0 && (
        <ProfileCard>
          <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6229FF]/70 whitespace-nowrap">
                Projects
              </span>
              <div className="flex-1 h-px bg-[#6229FF]/30" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </ProfileCard>
      )}

      {/* ── 2FA Modal ───────────────────────────────────────────────────────── */}
      {isOwner && twoFaOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setTwoFaOpen(false)} // close on backdrop click
        >
          <div
            className="beentra-form w-full max-w-md flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()} // prevent backdrop click from bubbling
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#6229FF]/20 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#6229FF]/10 shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-[#6229FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Two-Factor Authentication
                </h2>
              </div>
              <button
                onClick={() => setTwoFaOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition cursor-pointer text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <Twofa status={user.twoFactorEnabled} />
          </div>
        </div>
      )}

      {/* ── Edit Profile Modal ──────────────────────────────────────────────── */}
      {isOwner && modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setModalOpen(false)} // close on backdrop click
        >
          <div
            className="beentra-form w-full max-w-md max-h-[90vh] flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#6229FF]/20 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Edit profile
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition cursor-pointer text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable form body */}
            <div className="flex flex-col gap-4 overflow-y-auto pr-1">
              {/* Avatar picker — selecting updates the sidebar preview immediately on save */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#6229FF]/70 whitespace-nowrap">
                    Choose Avatar
                  </span>
                  <div className="flex-1 h-px bg-[#6229FF]/30" />
                </div>
                <div className="flex items-center gap-4">
                  {pendingAvatar ? (
                    <Image
                      src={pendingAvatar}
                      alt="current avatar"
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-16 h-16 ring-2 ring-[#6229FF]/30"
                    />
                  ) : (
                    <Image
                      src="/default-profile-picture.jpg"
                      alt="Default avatar"
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-16 h-16 ring-2 ring-[#6229FF]/30"
                    />
                  )}
                  <label
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed text-sm font-medium cursor-pointer transition
                      ${uploadingAvatar ? "border-gray-300 text-gray-400 opacity-60" : "border-[#6229FF]/40 text-[#6229FF]/70 hover:border-[#6229FF] hover:bg-[#6229FF]/5"}`}
                  >
                    {uploadingAvatar ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Uploading…
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        Upload image
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingAvatar}
                      onChange={handleAvatarFile}
                    />
                  </label>
                </div>
                {uploadError && (
                  <p className="text-xs text-red-500">{uploadError}</p>
                )}
              </div>

              {/* Personal information fields */}
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
              </div>

              {/* Password change — both fields must be filled or both left empty */}
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

              {/* Server-side error (e.g. duplicate email/username) */}
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
                Save
              </Button>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
