import { UsersTable } from "./UsersTable";
import { useState } from "react";
import { Button } from "../ui/Button";

export function Sidebar({
  userEmail,
  onButtonClick,
}: {
  userEmail: string;
  onButtonClick: any;
}) {
  return (
    <aside className="flex flex-col gap-5 w-64 bg-white shadow-lg p-6 border-r border-gray-300">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl text-center font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-center text-gray-600">
          Welcome, {userEmail}
        </p>
      </div>
      <nav className="flex flex-col items-center gap-3 space-y-3">
      <Button
        variant="sidebar"
        size="medium"
        onClick={() => onButtonClick("users")}
        >
              Users
      </Button>
      <Button
        variant="sidebar"
        size="medium"
        onClick={() => onButtonClick("events")}
        >
          Events
      </Button>
      <Button
        variant="sidebar"
        size="medium"
        onClick={() => onButtonClick("projects")}
        >
          Projects
      </Button>
      <Button
        variant="sidebar"
        size="medium"
        onClick={() => onButtonClick("add-page")}
        >
          Add Page
      </Button>
      <Button
        variant="sidebar"
        size="medium"
        onClick={() => onButtonClick("welcome")}
        >
          Back Home
      </Button>
      </nav>
    </aside>
  );
}
