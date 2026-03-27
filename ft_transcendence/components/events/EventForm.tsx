"use client";

import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import { useState } from "react";
import Input from "@/components/ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/lib/validation";
import { uploadImage } from "@/lib/uploadImage";

type FormValues = z.input<typeof eventSchema>;

type EventFormProps = {
  defaultValues?: DefaultValues<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  submitLabel: string;
  mode: "create" | "edit";
};

export default function EventForm({
  defaultValues,
  onSubmit,
  mode = "create",
}: EventFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    let imageUrl: string | null = data.image ?? null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    onSubmit({ ...data, image: imageUrl });
  };

  return (
    <div className="beentra-form-container">
      <form
        id={mode === "create" ? "create-event-form" : "edit-event-form"}
        onSubmit={handleSubmit(submitHandler)}
        className="beentra-form modal-form"
      >
        <Input
          label="Title"
          name="title"
          id="title"
          type="text"
          placeholder="Event title"
          required={true}
          register={register}
          errors={errors}
        />

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Date"
            name="date"
            id="date"
            type="date"
            placeholder=""
            required={true}
            register={register}
            errors={errors}
          />
          <Input
            label="From"
            name="timeFrom"
            id="timeFrom"
            type="time"
            placeholder=""
            required={true}
            register={register}
            errors={errors}
          />
          <Input
            label="To"
            name="timeTo"
            id="timeTo"
            type="time"
            placeholder=""
            required={true}
            register={register}
            errors={errors}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Location"
            name="location"
            id="location"
            type="text"
            placeholder="Location"
            required={true}
            register={register}
            errors={errors}
          />
          <Input
            label="Organizer"
            name="organizer"
            id="organizer"
            type="text"
            placeholder="Organizer"
            required={true}
            register={register}
            errors={errors}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="p-2" htmlFor="type">
              Type
            </label>
            <select
              {...register("type", { required: true })}
              className="bg-white ml-2 p-2 rounded-lg"
            >
              <option value="Student">Student</option>
              <option value="External">External</option>
            </select>
          </div>
          <Input
            label="Max Spots (0 = unlimited)"
            name="maxSpots"
            id="maxSpots"
            type="number"
            placeholder="0"
            required={false}
            register={register}
            errors={errors}
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="p-2">Description</label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Optional description"
            rows={5}
            className="bg-white ml-2 p-2 rounded-lg resize-y text-sm"
          />
          {errors.description && (
            <p className="text-red-500 text-sm ml-2">{errors.description.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
