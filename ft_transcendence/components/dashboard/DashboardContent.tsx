"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { UsersTable } from "./UsersTable";
import { EventsTable } from "./EventsTable";
import { Statistics } from "./Statistics";

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
      </main>
    </div>
  );
}

// Default welcome message
function WelcomeView() {

<<<<<<< HEAD
=======
	// const [numOfUsers, setNumOfUsers] = useState<number | null>(null);
	// const [numOfEvents, setNumOfEvents] = useState<number | null>(null);

	// useEffect(() => {
	// 	async function fetchStats() {
	// 	try {
	// 		const resUsers = await fetch('/api/user');
	// 		if (!resUsers.ok) {
	// 			throw new Error("Failed to fetch users");
	// 		}

	// 		const resEvents = await fetch('/api/events');
	// 		if (!resEvents.ok) {
	// 			throw new Error("Failed to fetch events");
	// 		}

	// 		const dataUsers = await resUsers.json();
	// 		const dataEvents = await resEvents.json();

	// 		// const userCount = dataUsers.length;
	// 		// const eventCount = dataEvents.length;

	// 		const userCount = await prisma.user.count();
	// 		const eventCount = await prisma.event.count();

	// 		setNumOfUsers(userCount);
	// 		setNumOfEvents(eventCount);
	// 	} catch {
	// 		console.log("Error");
	// 	}
	// }
	// fetchStats();
	// }, []);


>>>>>>> 342206b (Added statistics component, that calls a new api endpoint)
  return (
    <div className="bg-white rounded-lg shadow p-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Admin Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Select an option from the sidebar to get started
      </p>
	  <Statistics />
<<<<<<< HEAD
=======
	  {/* <div className="bg-gray-200 rounded-lg shadow p-12 text-center">
		This will have the stats
		<p>
			Total number of Users: {numOfUsers}
		</p>
		<p>
			Total number of Events: {numOfEvents}
		</p>
	  </div> */}
>>>>>>> 342206b (Added statistics component, that calls a new api endpoint)
    </div>
  );
}
