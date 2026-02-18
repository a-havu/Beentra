"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/SubmitFormButton";

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input
            label="First Name"
            placeholder={""}
            id="fname"
            type="text"
            {...register("fname")}
          />
          {errors.fname && (
            <p className="text-sm text-red-500">{errors.fname.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Last Name" 
            placeholder={""}
            id="lname"
            type="text"
            {...register("lname")}
          />
          {errors.lname && (
            <p className="text-sm text-red-500">{errors.lname.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Username"
            placeholder={""}
            id="username"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            placeholder={""}
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Phone Number"
            placeholder={"+358 40 123 4567"}
            id="phone"
            type="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Input
            label="password"
            placeholder={"Enter password"}
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Input
            label="confirm"
            placeholder={"Confirm your password"}
            id="confirm"
            type="password"
            {...register("confirm")}
          />
          {errors.confirm && (
            <p className="text-sm text-red-500">{errors.confirm.message}</p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <CustomButton type="submit">Create Account</CustomButton>
      </form>
    </div>
  );
}
