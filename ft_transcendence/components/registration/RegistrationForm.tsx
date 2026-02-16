"use client";

import React, { useState } from "react";
//import { input } from "@/components/ui/input";
//import { Button } from "@/components/ui/button";
///import { label } from "@/components/ui/label";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { on } from "events";

export const registerSchema = z
  .object({
    fname: z.string().min(1, "Required field"),
    lname: z.string().min(1, "Required field"),
    phone: z.string().regex(/^\+?[\d\s]{7,15}$/, "Invalid phone number"),
    /*date: z
    .string()
    .optional()
    .refine(
    (val) => {
      if (!val) return true;  // skip validation if empty
      const date = new Date(val);
      const now = new Date();
      return date < now;
    }, { message: "invalid date" }),*/
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Min. 8 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

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
      const response = await fetch("/api/register", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log("Response data:", result);
      if (!response.ok) {
        setServerError(result.message);
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
          <label htmlFor="fname">First Name</label>
          <input
            id="fname"
            type="text"
            {...register("fname")}
          />
          {errors.fname && (
            <p className="text-sm text-red-500">{errors.fname.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            id="lname"
            type="text"
            {...register("lname")}
          />
          {errors.lname && (
            <p className="text-sm text-red-500">{errors.lname.message}</p>
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
          <label htmlFor="date">Date of Birth</label>
          <input id="date" type="date" {...register("date")} />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
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
