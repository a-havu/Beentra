"use client";

import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import CustomButton from "../ui/SubmitFormButton";
import Input from "@/components/ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = z.input<typeof schema>;

type EventFormProps = {
  defaultValues?: DefaultValues<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  submitLabel: string;
  mode: "create" | "edit";
};

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const schema = z
  .object({
    title: z.string().min(2, "Title too short").max(30, "Title too long"),
    date: z.coerce.date(),
    timeFrom: z.string().regex(timeRegex, "Invalid time format"),
    timeTo: z.string().regex(timeRegex, "Invalid time format"),
    location: z
      .string()
      .min(2, "Location too short")
      .max(30, "Location too long"),
    organizer: z
      .string()
      .min(2, "Organizer too short")
      .max(30, "Organizer too long"),
    type: z.enum(["Student", "External"]),
    image: z
      .any()
      .optional()
      .refine(
        (file) => !file || file.length === 0 || file[0]?.size <= 1_000_000,
        "Image file must be smaller than 1MB"
      )
      .refine(
        (file) =>
          !file ||
          file.length === 0 ||
          ["image/jpeg", "image/png", "image/webp"].includes(file[0]?.type),
        "Only JPG, PNG, WEBP allowed"
      ),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.date >= new Date(new Date().setHours(0, 0, 0, 0));
    },
    {
      message: "Date cannot be in the past",
      path: ["date"],
    }
  )
  .refine(
    (data) => {
      return data.timeTo > data.timeFrom;
    },
    {
      message: "End time must be after start time",
      path: ["timeTo"],
    }
  );

export default function EventForm({
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  mode = "create",
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl bg-whit p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {mode === "create" ? "Create Event" : "Edit Event"}
      </h2>
      <Input
        label="Title"
        name="title"
        id="title"
        type="text"
        placeholder="Title"
        required={true}
        register={register}
        errors={errors}
      />
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
        label="Time From"
        name="timeFrom"
        id="timeFrom"
        type="time"
        placeholder=""
        required={true}
        register={register}
        errors={errors}
      />
      <Input
        label="Time To"
        name="timeTo"
        id="timeTo"
        type="time"
        placeholder=""
        required={true}
        register={register}
        errors={errors}
      />
      <Input
        label="Location"
        name="location"
        id="location"
        type="text"
        placeholder=""
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
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Type:
        </label>
        <select
          {...register("type", { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="Student">Student</option>
          <option value="External">External</option>
        </select>
      </div>
      <Input
        label="Image"
        name="image"
        id="image"
        type="file"
        placeholder="Upload Image"
        required={false}
        register={register}
        errors={errors}
      />
      <Input
        label="Description"
        name="description"
        id="description"
        type="text"
        placeholder="Event Description"
        required={false}
        register={register}
        errors={errors}
      />
      <CustomButton type="submit">{submitLabel}</CustomButton>
    </form>
  );
}
