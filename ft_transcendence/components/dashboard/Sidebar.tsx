import { UsersTable } from "./UsersTable";
import { useState } from "react";

export function Sidebar({ userEmail, onButtonClick }: { userEmail: string, onButtonClick: any }) {
  return (
    <aside className="m-auto flex flex-col gap-5 w-64 bg-white shadow-lg p-6 border-r border-gray-300">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl text-center font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-center text-gray-600">Welcome, {userEmail}</p>
      </div>
      <nav className="flex flex-col gap-3 space-y-3">
        <button
          onClick={() => onButtonClick("users")}
          className="content-between w-1/2 text-center px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Users
        </button>

        <button
          onClick={() => onButtonClick("events")}
          className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Events
        </button>

        <button
          onClick={() => onButtonClick("projects")}
          className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Projects
        </button>
		<button
          onClick={() => onButtonClick("welcome")}
          className="w-full text-left px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition"
        >
          Back Home
        </button>
      </nav>
    </aside>
  );
}
