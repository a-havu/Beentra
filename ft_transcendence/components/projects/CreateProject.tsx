'use client'

import { SubmitHandler } from 'react-hook-form'
import ProjectForm from './ProjectForm'
import { projectSchema } from '@/lib/validation';
import { z } from 'zod';

type FormValues = z.input<typeof projectSchema>;

export default function CreateProject() {
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		
	}
}

