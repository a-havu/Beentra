"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { UsersTable } from "./UsersTable";
import { EventsTable } from "./EventsTable";
import PageForm from "./pages/PageForm";
import WelcomeView from "./WelcomeView";

// the fetchPages is a component sent by props.
export function DashboardContent({ userEmail, fetchPages }: { userEmail: string, fetchPages: React.ReactNode }) {
  const [activeView, setActiveView] = useState("welcome");

  const handleButtonClick = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userEmail={userEmail} onButtonClick={handleButtonClick} />
      <main className="flex-1 p-8">
        {activeView === "welcome" && <WelcomeView />}
        {activeView === "users" && <UsersTable />}
        {activeView === "events" && <EventsTable />}
        {activeView === "projects" && <WelcomeView />}
        {activeView === "add-page" && <PageForm initialData={null} />}
        {activeView === "pages" && fetchPages}
      </main>
    </div>
  );
}


