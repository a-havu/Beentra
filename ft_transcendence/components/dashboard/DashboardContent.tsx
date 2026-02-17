"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { UsersTable } from "./UsersTable";
import { EventsTable } from "./EventsTable";
import { Statistics } from "./Statistics";
import PageForm from "./pages/PageForm";

export function DashboardContent({ userEmail }: { userEmail: string }) {
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
				{activeView === "projects" && <p>Projects section!</p>}
				{activeView === "add-page" && <PageForm initialData={null} />}
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
			<Statistics />
		</div>
	);
}
