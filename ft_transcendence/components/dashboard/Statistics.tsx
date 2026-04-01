"use client";

import { useState } from "react";
import { useEffect } from "react";

export function Statistics() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [eventCount, setEventCount] = useState<number | null>(null);
  const [projectCount, setProjectCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();

        setUserCount(data.users);
        setEventCount(data.events);
        setProjectCount(data.projects);
        setActiveUserCount(data.activeUsers);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg p-6 flex gap-4">
      <div className=" flex-1 bg-white rounded-lg p-6">
        <p className="text-lg text-gray-600">Total Users</p>
        <p className="text-3xl font-bold text-gray-900">
          {activeUserCount} / {userCount}
        </p>
      </div>
      <div className="flex-1 bg-white rounded-lg p-6">
        <p className="text-lg text-gray-600">Total Events</p>
        <p className="text-3xl font-bold text-gray-900">{eventCount}</p>
      </div>
      <div className="flex-1 bg-white rounded-lg p-6">
        <p className="text-lg text-gray-600">Total Projects</p>
        <p className="text-3xl font-bold text-gray-900">{projectCount}</p>
      </div>
    </div>
  );
}
