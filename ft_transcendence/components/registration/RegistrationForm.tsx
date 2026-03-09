"use client"; // Marks this as a Client Component so hooks and browser APIs work

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Used to navigate between pages
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Connects Zod schema validation to react-hook-form
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Infer the TypeScript type from the Zod schema so form fields are type-safe
type FormFields = z.infer<typeof registerSchema>;

/**
 * RegistrationForm — handles new user sign-up.
 * Validates input via Zod, submits to POST /api/user,
 * and redirects to /login on success.
 */
export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
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
    setServerError("");
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
      setSubmitted(true);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="beentra-form-container">
      <div className="beentra-form">
        <Input label="Full Name" name="fullName" id="fullName" type="text" placeholder="Full name" register={register} />
        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}

        <Input label="Username" name="username" id="username" type="text" placeholder="Choose a username" register={register} />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}

        <Input label="Email" name="email" id="email" type="email" placeholder="name@example.com" register={register} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <Input label="Phone Number" name="phone" id="phone" type="tel" placeholder="+358 40 123 4567" register={register} />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

        <Input label="Password" name="password" id="password" type="password" placeholder="Enter password" register={register} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <Input label="Confirm Password" name="confirm" id="confirm" type="password" placeholder="Confirm your password" register={register} />
        {errors.confirm && <p className="text-sm text-red-500">{errors.confirm.message}</p>}

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button variant="adding" disabled={submitted} onClick={handleSubmit(onSubmit)}>
          Create Account
        </Button>
      </div>
    </div>
  );
}