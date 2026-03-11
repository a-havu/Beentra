"use client";

import { createPage, updatePage } from "@/app/(protected)/actions";
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useState } from "react";

type ActionResult = {
  success: boolean;
  error?: string;
}

type PageFormProps = {
  id?: number | null;
  initialData: {
    title: string,
    text: string,
  } | null
}

export default function PageForm({ id = null, initialData = null }: PageFormProps) {

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
        <div >
          <label htmlFor="pageTitle">Page Title</label>
          <input
            id="pageTitle"
            type="text"
            placeholder="page title"
            name="pageTitle"
            defaultValue={initialData?.title}
          />
        </div>

        <div className="w-full min-w-0 overflow-hidden">
  <label htmlFor="pageContent">Page Content</label>
  <SimpleEditor 
    content={content}
    onUpdate={setContent}
  />
</div>

        <button type="submit">
          {id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}