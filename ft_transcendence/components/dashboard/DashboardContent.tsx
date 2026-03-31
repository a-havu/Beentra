"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { UsersTable } from "./UsersTable";
import { EventsTable } from "./EventsTable";
import PageForm from "../pages/PageForm";
import WelcomeView from "./WelcomeView";
import { ProjectsTable } from "./ProjectsTable";
import { PagesTable } from "./PagesTable";

// the fetchPages is a component sent by props.
export function DashboardContent({ userEmail, fetchPages }: { userEmail: string, fetchPages: React.ReactNode }) {
  const [activeView, setActiveView] = useState("welcome");

  const handleButtonClick = (view: string) => {
    setActiveView(view);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#dff5fa] rounded-xl">
		{/* Hamburger button */}
		<button
		className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
		onClick={() => setSidebarOpen(!sidebarOpen)}
		></button>
		
      <Sidebar userEmail={userEmail} onButtonClick={handleButtonClick} />
      <main className="flex-1 p-8">
        <div className="hidden md:block">{activeView === "welcome" && <WelcomeView />}</div>
        {activeView === "users" && <UsersTable />}
        {activeView === "events" && <EventsTable />}
        {activeView === "projects" && <ProjectsTable />}
        {activeView === "add-page" && <PageForm initialData={null} />}
        {/* {activeView === "pages" && <PagesTable />} */}
        {activeView === "pages" && fetchPages}
      </main>
    </div>
  );
}
