"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type FormFields = z.infer<typeof registerSchema>;

export function RegistrationForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(form: FormFields) {
    setServerError("");

    if (!termsAccepted) {
      setTermsError("You must accept the Terms of Service and Privacy Policy");
      return;
    }

    setTermsError("");

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) {
        setServerError(result.error || "Registration failed");
        return;
      }
      setSubmitted(true);
      router.push("/login");
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

        <Input label="Password" name="password" id="password" type="password" placeholder="Enter password" register={register} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        <Input label="Confirm Password" name="confirm" id="confirm" type="password" placeholder="Confirm your password" register={register} />
        {errors.confirm && <p className="text-sm text-red-500">{errors.confirm.message}</p>}

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked)
              if (e.target.checked) setTermsError("")
            }}
          />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <a href="/terms" target="_blank" className="underline hover:opacity-75">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" target="_blank" className="underline hover:opacity-75">Privacy Policy</a>
          </label>
        </div>
        {termsError && <p className="text-sm text-red-500">{termsError}</p>}

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        <Button variant="adding" disabled={submitted || !termsAccepted} onClick={handleSubmit(onSubmit)}>
          Create Account
        </Button>
      </div>
    </div>
  );
}
