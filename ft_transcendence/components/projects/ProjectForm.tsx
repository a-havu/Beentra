'use client'

import { useForm, SubmitHandler } from "react-hook-form";         
import Input from "@/components/ui/Input";
import { Button } from "../ui/Button";
import { z } from "zod";
import { projectSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";


type FormValues = z.input<typeof projectSchema>;

type ProjectFormProps = {
	onSubmit: SubmitHandler<FormValues>;
	mode: "create" | "edit";
};

export default function ProjectForm({
	onSubmit,
	mode = "create"
}: ProjectFormProps) {
	const { register,
		handleSubmit,
		formState: { errors },
	 } = useForm<FormValues>({resolver: zodResolver(projectSchema)});
	const submitHandler: SubmitHandler<FormValues> = (data) => {
		onSubmit(data);
	};
	return (
	<form
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
		 <Button type="submit"
		 variant="adding">Create Project :)</Button>
	</form>)
}