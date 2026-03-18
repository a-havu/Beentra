"use client";

import { SubmitHandler } from 'react-hook-form'
import ProjectForm from './ProjectForm'
import { projectSchema } from '@/lib/validation';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormValues = z.input<typeof projectSchema>;

export default function CreateProject() {
	const [showForm, setShowForm] = useState(false);
	const router = useRouter();
	const handleSubmit: SubmitHandler<FormValues> = async (data) => {
	const res = await fetch("/api/projects", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
});

if (res.ok) {
	setShowForm(false);
	router.refresh();
}
};
return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setShowForm(true)} type="button">
        Create Project
      </Button>
      {showForm && <ProjectForm
	  mode="create"
	  onSubmit={handleSubmit}
	  onCloseAction={() => setShowForm(false)} />}
    </div>
  );
};
