
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
		<div className="bg-gray-200 rounded-lg shadow p-12 text-center">
		This will have the stats
		<p>
			Total number of Users: {userCount}
		</p>
		<p>
			Total number of Events: {eventCount}
		</p>
	  </div>
	);
}
