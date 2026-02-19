"use client";

import { useState } from "react";
import EditEvent from "./EditEvent";

export default function EditEventTest() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShow(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Edit Form
      </button>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✕
            </button>

            <EditEvent id="YOUR_EVENT_ID_HERE" />
          </div>
        </div>
      )}
    </div>
  );
}
