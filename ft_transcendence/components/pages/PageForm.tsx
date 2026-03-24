"use client";

import { createPage, updatePage } from "@/app/(protected)/actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MinimalEditor from "@/components/tiptap/MinimalEditor";
import { PageZodSchema, PageZodType } from "@/types/zodScemas";
import Input from "../ui/Input";

type ActionResult = {
  success: boolean;
  error?: string;
};

type PageFormProps = {
  id?: number | null;
  initialData?: { title?: string; text?: string } | null;
  onSuccess?: () => void;
};

export default function PageForm({
  id = null,
  initialData = null,
  onSuccess,
}: PageFormProps) {
  const [content, setContent] = useState(initialData?.text || "");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PageZodType>({
    resolver: zodResolver(PageZodSchema),
    defaultValues: {
      title: initialData?.title || "",
    },
  });

  async function onSubmit(data: PageZodType) {
    setServerError(null);
    console.log("onSubmit fired", data); // add this

    const formData = new FormData();
    formData.set("pageTitle", data.title);
    formData.set("pageText", content);

    let result: ActionResult;

    if (id) {
      result = await updatePage.bind(null, id)(formData);
    } else {
      result = await createPage(formData);
    }

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong");
      return;
    }

    onSuccess?.();
  }

  return (
    <div className="bg-white flex flex-col w-full min-w-0 overflow-hidden">
      <h1>{id ? "Update page" : "Add new page"}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Page Title"
            id="pageTitle"
            name="title"
            placeholder="title"
            type="text"
            register={register}
            errors={errors}
          />
        </div>

        <div className="mt-4">
          <MinimalEditor content={content} onUpdate={setContent} />
        </div>

        {serverError && (
          <p className="text-red-500 text-sm mt-2">{serverError}</p>
        )}

        <button type="submit">{id ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}
