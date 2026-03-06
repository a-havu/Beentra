"use client";

import { SubmitHandler } from 'react-hook-form'
import ProjectForm from './ProjectForm'
import { projectSchema } from '@/lib/validation';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import React, { useState } from 'react';
import error from 'next/error';

type FormValues = z.input<typeof projectSchema>;

export default function CreateProject() {
	const [showForm, setShowForm] = useState(false);
	const handleSubmit: SubmitHandler<FormValues> = async (data) => {
		console.error("ERROR", error);
	const res = await fetch("/api/projects", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
});

if (res.ok) {
	setShowForm(false);
	}
};
return (
    <>
      <Button onClick={() => setShowForm(true)} type="button">
        Create Project by clicking this button
      </Button>
      {showForm && <ProjectForm mode="create" onSubmit={handleSubmit} />}
    </>
  );
};
