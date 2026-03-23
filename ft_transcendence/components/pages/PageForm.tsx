"use client";

import { createPage, updatePage } from "@/app/(protected)/actions";
import { useState } from "react";
import MinimalEditor from "@/components/tiptap/MinimalEditor";
import { PageZodType } from "@/types/zodScemas";
import Input from "../ui/Input";
type ActionResult = {
  success: boolean;
  error?: string;
};

type PageFormProps = {
  id?: number | null;
  initialData: Partial<PageZodType> | null;
};

export default function PageForm({
  id = null,
  initialData = null,
}: PageFormProps) {
  const [content, setContent] = useState(initialData?.text || "");

  async function handleSubmit(formData: FormData) {
    formData.set("pageText", content);

    let result: ActionResult;

    if (id) {
      const updatePageWithId = updatePage.bind(null, id);
      result = await updatePageWithId(formData);
    } else {
      result = await createPage(formData);
    }

    if (!result.success) {
      alert("Error: " + result.error);
      return;
    }

    alert(id ? "Page updated!" : "Page created!");
  }

  return (
    <div className="bg-white flex flex-col w-full min-w-0 overflow-hidden">
      <h1>Adding new page</h1>

      <form action={handleSubmit}>
        <div>
          <Input
            label="Page Title"
            id="pageTitle"
            name="pageTitle"
            placeholder="title"
            type="text"
            defaultValue={initialData?.title}
          />
        </div>

        <div className="mt-4">
          <MinimalEditor content={content} onUpdate={setContent} />
        </div>

        <button type="submit">{id ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}
