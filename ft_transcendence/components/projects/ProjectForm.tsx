'use client'

import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";         
import Input from "@/components/ui/Input";
import { Button } from "../ui/Button";
import { z } from "zod";
import { projectSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { uploadImage } from "@/lib/uploadImage";
import { useState } from "react";

type FormValues = z.input<typeof projectSchema>;

type ProjectFormProps = {
	defaultValues?: DefaultValues<FormValues>;
	onSubmit: SubmitHandler<FormValues>;
	mode: "create" | "edit";
	onCloseAction?: () => void;
};

export default function ProjectForm({
	defaultValues,
	onSubmit,
	mode = "create",
	onCloseAction,
}: ProjectFormProps) {
	const [imageFile, setImageFile] = useState<File | null>(null);

	const { register,
		handleSubmit,
		formState: { errors },
	 } = useForm<FormValues>({
		defaultValues,
		resolver: zodResolver(projectSchema)});

	const submitHandler: SubmitHandler<FormValues> = async (data) => {
		let imageUrl: string | null = null;
		if (imageFile) {
			imageUrl = await uploadImage(imageFile);
		}
		onSubmit({...data, image: imageUrl});
	};

	const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
	const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
	const [imageError, setImageError] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  	const file = e.target.files?.[0] ?? null;
	setImageError(null);

	if (file) {
		if (!ALLOWED_TYPES.includes(file.type)) {
		setImageError("Only JPEG, PNG, and WebP images are allowed");
		setImageFile(null);
		return;
		}
		if (file.size > MAX_IMAGE_SIZE) {
		setImageError("Image must be under 5MB");
		setImageFile(null);
		return;
		}
	}
	setImageFile(file);
};

	return (
		<div className="beentra-form-container modal-form-container">
	<form className="beentra-form modal-form"
	onSubmit={handleSubmit(submitHandler)}>
		<h3>{mode === "create" ? "New Project" : "Update Project"}</h3>
		<Input
		label="Project Name *"
		name="projectName"
		id="projectName"
		type="text"
		placeholder="Project name"
		required={true}
		register={register}
		errors={errors}
		 />
		<Input
		label="One Liner *"
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
		placeholder="Separate with commas"
		required={false}
		register={register}
		errors={errors}
		 />

		 <p className="ml-2 text-black">Description</p> 
		 <textarea
		id="description"
		placeholder="Description"
		{...register("description")}
		rows={10}
		className="bg-white border border-gray-300 rounded-xl ml-2 p-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
		/>
		{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}

		<div className="flex flex-col gap-2">
		<label className="p-2">Image</label>
		<div className="ml-2 flex items-center gap-3">
		<label
			htmlFor="image-upload"
			className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-600 hover:ring-1 hover:ring-yellow-400 hover:border-yellow-400 transition-colors"
			>
			{imageFile ? imageFile.name : "Upload image"}
		</label>
		<input
			id="image-upload"
			type="file"
			accept="image/jpeg,image/png,image/webp"
			onChange={handleImageChange}
			className="hidden"
			/>
			{imageFile && (
		<button
			type="button"
			onClick={() => {
			setImageFile(null);
			setImageError(null);
			// reset the file input so the same file can be re-selected
			const input = document.getElementById("image-upload") as HTMLInputElement;
			if (input) input.value = "";
			}}
			className="cursor-pointer text-sm text-red-500 hover:text-red-700 transition-colors">
			❌ Remove
		</button>
		)}
	</div>
	{imageError && <p className="ml-2 text-red-500 text-sm">{imageError}</p>}
	</div>

		<div className="flex gap-2 justify-end mt-4">
		 <Button type="submit"
		 variant="primary">
			{mode === "create" ? "Create" : "Update"}
		 </Button>
		 {onCloseAction && (
			<Button type="button"
			variant="secondary"
			onClick={onCloseAction}
			>Cancel</Button>
		 )}
		 </div>
	</form>
	</div>)
}