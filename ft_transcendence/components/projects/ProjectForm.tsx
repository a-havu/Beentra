'use client'

import { useForm, SubmitHandler } from "react-hook-form";         
import Input from "@/components/ui/Input";
import { Button } from "../ui/Button";
import { z } from "zod";
import { projectSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { uploadImage } from "@/lib/uploadImage";
import { useState } from "react";

type FormValues = z.input<typeof projectSchema>;

type ProjectFormProps = {
	onSubmit: SubmitHandler<FormValues>;
	mode: "create" | "edit";
	onCloseAction?: () => void;
};

export default function ProjectForm({
	onSubmit,
	mode = "create",
	onCloseAction,
}: ProjectFormProps) {
	const [imageFile, setImageFile] = useState<File | null>(null);

	const { register,
		handleSubmit,
		formState: { errors },
	 } = useForm<FormValues>({resolver: zodResolver(projectSchema)});

	const submitHandler: SubmitHandler<FormValues> = async (data) => {
		let imageUrl: string | null = null;
		if (imageFile) {
			imageUrl = await uploadImage(imageFile);
		}
		onSubmit({...data, image: imageUrl});
	};
	return (
		<div className="beentra-form-container modal-form-container">
	<form className="beentra-form modal-form"
	onSubmit={handleSubmit(submitHandler)}>
		<Input
		label="Project Name"
		name="projectName"
		id="projectName"
		type="text"
		placeholder="Project name"
		required={true}
		register={register}
		errors={errors}
		 />
		<Input
		label="One Liner"
		name="oneLiner"
		id="oneLiner"
		type="text"
		placeholder="Short description"
		required={true}
		register={register}
		errors={errors}
		 />
		<Input
		label="Link"
		name="link"
		id="link"
		type="text"
		placeholder="github, website, etc."
		required={false}
		register={register}
		errors={errors}
		 />
		<Input
		label="Tech Stack"
		name="techStack"
		id="techStack"
		type="text"
		placeholder="Tech stack"
		required={false}
		register={register}
		errors={errors}
		 />
		 <Input
		label="Description"
		name="description"
		id="description"
		type="text"
		placeholder="Description"
		required={false}
		register={register}
		errors={errors}
		 />
		<div>
          <label>Image</label><br />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </div>
		 <Button type="submit"
		 variant="adding">Create</Button>
		 {onCloseAction && (
			<Button type="button"
			variant="secondary"
			onClick={onCloseAction}
			>Cancel</Button>
		 )}
	</form></div>)
}