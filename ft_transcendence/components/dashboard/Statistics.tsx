"use client";

import { useState } from "react";
import { useEffect } from "react";
import { registerCharts } from "@/charts/registerCharts";
import { Doughnut } from "react-chartjs-2";

registerCharts();

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

  {/*
  const labels = ["Online", "Offline"];
  const dataValues = [activeUserCount, userCount];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ["rgba(51, 255, 51)", "rgb(160, 160, 160)"],
        borderColor: ["rgb(51, 255, 51)", "rgb(160, 160, 160)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Users",
      },
    },
  }; */}

  return (
    // Main container
    <div className="flex flex-col md:flex-row bg-[#d5dbd3] rounded-lg p-6 flex gap-4">
      Single information box inside the main container
      <div className=" flex-1 bg-white rounded-lg p-6">
        <p className="text-lg text-gray-600">Total Users</p>
        <p className="text-3xl font-bold text-gray-900">
          {activeUserCount} / {userCount}
        </p>
        {/*<Doughnut data={data} options={options} />*/}
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
