
'use client'

import { useState } from "react";
import { useEffect } from "react";



export function Statistics() {

	const [userCount, setUserCount] = useState<number | null>(null);
	const [eventCount, setEventCount] = useState<number | null>(null);

	useEffect(() => {
		async function fetchStats() {
			try {
				const response = await fetch('/api/stats');
				const data = await response.json();

				setUserCount(data.users);
				setEventCount(data.events);
			} catch (err) {
				console.error('Error:', err);
			}
		}

		fetchStats();
	}, []);

	return (
		// Main container
		<div className="bg-gray-100 rounded-lg p-6 flex gap-4">
			{/* Single information box inside the main container */}
			<div className=" flex-1 bg-white rounded-lg p-6">
      			<p className="text-lg text-gray-600">Total Users</p>
      			<p className="text-3xl font-bold text-gray-900">{userCount}</p>
			</div>
			{/* Box 2 - Events */}
			<div className="flex-1 bg-white rounded-lg p-6">
				<p className="text-lg text-gray-600">Total Events</p>
				<p className="text-3xl font-bold text-gray-900">{eventCount}</p>
			</div>
		</div>
	);
}
