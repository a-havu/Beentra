"use client"

import React, { useState } from "react";
import { useEffect } from "react";
import { Page } from "@/lib/generated/prisma/client";
import { tr } from "zod/v4/locales";
import { Button } from "../ui/Button";
//import FetchPages from "./pages/FetchPages";

export function PagesTable() {
	const [pages, setPages] = useState<Page[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [selectedPage, setSelectedPage] = useState<Page | null>(null);

	useEffect(() => {
		fetchPages();
	}, []);

	const fetchPages = async () => {
		try {
			setIsLoading(true);

			const response = await fetch("/api/pages", {
				method: "GET",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch pages");
		}
		const data = await response.json();

		setPages(data);
		setError(null);

		} catch (err) {
			console.error("Failed to fetch pages: ", err);
			setError("Failed to fetch pages");
		
		} finally {
			setIsLoading(false);
		}
	};

	const handleSuccess = () => {
		setEditingId(null);
		fetchPages();
	};

	const reRender = () => {
		fetchPages();
	};

	if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-600">Loading pages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
	<>
	<div className="bg-white rounded-lg shadow p-6">
		<div className="flex justify-between items-center mb-6">
			<h2 className="text-2xl font-bold text-blue-900">Pages Management</h2>
			
		</div>
		<div>
			<table className="w-full">
				<thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Modify
                </th>
              </tr>
            </thead>
			<tbody className="divide-y divide-gray-300">
				{pages.map((page, index) => {
					return (
						<tr
							key={page.id}
							className="hover:bg-gray-50 transition cursor-pointer"
							onClick={() => setSelectedPage(page)}
						>
							<td className="px6 py-4 text-center text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {page.title}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {page.authorId}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="edit"
                          onClick={() => setEditingId(page.id)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
						</tr>
					)
				})}
			</tbody>
			</table>
		</div>
	</div>
	</>
  )
}