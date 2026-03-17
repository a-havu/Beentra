"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

type Props = {
  content: string;
  onUpdate: (html: string) => void;
};

export default function MinimalEditor({ content, onUpdate }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        blockquote: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        italic: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full min-w-0 border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive("bold")
              ? "bg-blue-800 text-white"
              : "bg-white border border-gray-300 hover:bg-gray-100"
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("paragraph")
              ? "bg-blue-800 text-white"
              : "bg-white border border-gray-300 hover:bg-gray-100"
          }`}
        >
          ¶
        </button>

        {([1, 2, 3, 4, 5, 6] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={`px-3 py-1 rounded text-sm font-semibold ${
              editor.isActive("heading", { level })
                ? "bg-blue-800 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            H{level}
          </button>
        ))}

        {/* Divider */}
        <span className="w-px bg-gray-300 mx-1" />

        {/* Alignment */}
        {(["left", "center", "right", "justify"] as const).map((align) => (
          <button
            key={align}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={`px-3 py-1 rounded text-sm ${
              editor.isActive({ textAlign: align })
                ? "bg-blue-800 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {align === "left" && "⬅"}
            {align === "center" && "↔"}
            {align === "right" && "➡"}
            {align === "justify" && "☰"}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="w-full min-w-0 p-4 min-h-[200px] prose max-w-none focus:outline-none"
      />
    </div>
  );
}
