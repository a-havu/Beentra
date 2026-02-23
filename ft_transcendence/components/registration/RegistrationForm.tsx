"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation";

type FormFields = z.infer<typeof registerSchema>;

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(form: FormFields) {
    setServerError("");

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log("Response data:", result);
      if (!response.ok) {
        setServerError(result.error || "Registration failed");
        return;
      }
      setSubmitted(true);
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  if (submitted) {
    return <p>Account created!</p>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Choose a username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="+358 40 123 4567"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>


        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            placeholder="Confirm your password"
            {...register("confirm")}
          />
          {errors.confirm && (
            <p className="text-sm text-red-500">{errors.confirm.message}</p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <button type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
