"use client"; // Marks this as a Client Component so hooks and browser APIs work

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Used to navigate between pages
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Connects Zod schema validation to react-hook-form
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation"; // Zod schema that defines required fields and validation rules

// Infer the TypeScript type from the Zod schema so form fields are type-safe
type FormFields = z.infer<typeof registerSchema>;

/**
 * RegistrationForm — handles new user sign-up.
 * Validates input via Zod, submits to POST /api/user,
 * and redirects to /login on success.
 */
export function RegistrationForm() {
  const router = useRouter(); // Used to redirect to /login after successful registration
  const [serverError, setServerError] = useState(""); // Stores error messages returned from the API

  // Set up react-hook-form with Zod schema validation
  const {
    register,      // Registers each input field into the form
    handleSubmit,  // Wraps onSubmit — runs validation before calling it
    formState: { errors }, // Per-field validation errors from Zod
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  /**
   * onSubmit — called after client-side validation passes.
   * Posts form data to the API; on success redirects to login page.
   */
  async function onSubmit(form: FormFields) {
    setServerError(""); // Clear any previous server error before retrying

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        // Show the server-side error (e.g. duplicate email/username)
        setServerError(result.error || "Registration failed");
        return;
      }

      // Account created successfully — redirect user to the login page
      router.push("/login");
    } catch (error) {
      // Network or unexpected errors
      setServerError("An unexpected error occurred. Please try again.");
    }
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
