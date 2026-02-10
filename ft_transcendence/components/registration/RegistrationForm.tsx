"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type FormFields = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirm: string;
  phone: string;
  date: string;
};
 
type Errors = Partial<FormFields>;

export function RegistrationForm() {
  const [form, setForm] = useState<FormFields>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    date: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate(): Errors {
    const errs: Errors = {};
    if (!form.fname.trim()) errs.fname = "First name is required";
    if (!form.lname.trim()) errs.lname = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!/^\+?[\d\s]{7,15}$/.test(form.phone))
      errs.phone = "Enter a valid phone number";
    if (!form.date) errs.date = "Date of birth is required";
    if (form.password.length < 8) errs.password = "Min. 8 characters";
    if (form.confirm !== form.password) errs.confirm = "Passwords do not match";
    return errs;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // TODO: await fetch('/api/register', { method: 'POST', body: JSON.stringify(form) })
    setSubmitted(true);
  }

  if (submitted) {
    return <p>Account created! Welcome, {form.fname}.</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <Label htmlFor="fname">First Name</Label>
          <Input
            id="fname"
            name="fname"
            type="text"
            placeholder="John"
            value={form.fname}
            onChange={handleChange}
          />
          {errors.fname && (
            <p className="text-sm text-red-500">{errors.fname}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lname">Last Name</Label>
          <Input
            id="lname"
            name="lname"
            type="text"
            placeholder="Doe"
            value={form.lname}
            onChange={handleChange}
          />
          {errors.lname && (
            <p className="text-sm text-red-500">{errors.lname}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+358 40 123 4567"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="date">Date of Birth</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="Confirm your password"
            value={form.confirm}
            onChange={handleChange}
          />
          {errors.confirm && (
            <p className="text-sm text-red-500">{errors.confirm}</p>
          )}
        </div>
        <Button type="submit">
          Create Account
        </Button>
      </form>
    </div>
  );
}
