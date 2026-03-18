"use client";

import { SubmitHandler } from "react-hook-form";
import { Button } from "../ui/Button";
import ProjectForm from "./ProjectForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { projectSchema } from "@/lib/validation";
import { z } from "zod";
import { Project } from "@/lib/generated/prisma/browser";

type FormValues = z.input<typeof projectSchema>;

type Props = {
  project: Project;
  onSuccess?: () => void;
};

export default function EditProject({ project, onSuccess }: Props) {
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();
    const [defaultValues, setDefaultValues] = useState<FormValues>({
        projectName: project.projectName,
        oneLiner: project.oneLiner,
        link: project.link ?? undefined,
        techStack: project.techStack ?? undefined,
        description: project.description ?? undefined,
        image: project.image,
    });

    const handleSubmit: SubmitHandler<FormValues> = async (data) => {
        const res = await fetch(`/api/projects/${project.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        if (res.ok) {
            const updatedProject = await res.json();
            setDefaultValues({
                projectName: updatedProject.projectName,
                oneLiner: updatedProject.oneLiner,
                link: updatedProject.link ?? undefined,
                techStack: updatedProject.techStack ?? undefined,
                description: updatedProject.description ?? undefined,
                image: updatedProject.image,
            });
            setShowForm(false);
            router.refresh();
            onSuccess?.();
        }
    };
    return (
        <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setShowForm(true)} type="button">
            Edit
        </Button>
        {showForm && <ProjectForm
        defaultValues={defaultValues}
        mode="edit"
        onSubmit={handleSubmit}
        onCloseAction={() => setShowForm(false)} />}
        </div>
    );
}