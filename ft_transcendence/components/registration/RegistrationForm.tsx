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

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
        </div>
        <Button type="submit">
          Create Account
        </Button>
      </form>
    </div>
  );
}
