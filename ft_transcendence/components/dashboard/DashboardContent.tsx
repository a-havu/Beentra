"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { UsersTable } from "./UsersTable";
import { EventsTable } from "./EventsTable";

export function DashboardContent({ userEmail }: { userEmail: string }) {
  const [activeView, setActiveView] = useState("welcome");

  // For practise
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = (view: string) => {
    setActiveView(view);
    setClickCount(clickCount + 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userEmail={userEmail} onButtonClick={handleButtonClick} />
      <main className="flex-1 p-8">
        <div className="mb-4 text-right text-gray-600">
          Total Clicks: {clickCount}
        </div>
        {activeView === "welcome" && <WelcomeView />}
        {activeView === "users" && <UsersTable />}
        {activeView === "events" && <EventsTable />}
        {activeView === "projects" && <p>Projects section!</p>}

        {/* THIS IS FOR PRACTICE*/}
        <div className="py-3">
          <button
            className="p-4
				 text-left
				 px-4
				 py-3
				 bg-red-200
				 border
				 shadow-lg
				 border-gray-300
				 rounded-lg
				 text-lg
				 font-bold
				 text-gray-900
				 hover:bg-red-800
				 hover:border-white
				 hover:text-white transition"
            onClick={() => setClickCount(0)}
          >
            Reset Counter
          </button>
        </div>
      </main>
    </div>
  );
}

// Default welcome message
function WelcomeView() {
  return (
    <div className="bg-white rounded-lg shadow p-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Admin Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Select an option from the sidebar to get started
      </p>
      <div></div>
    </div>
  );
}
