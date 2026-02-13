'use client'
import { useState } from "react";
import { useEffect } from "react";

type User = {
	id: number;
	email: string;
	role: string;
	createdAt: string;
}

// The table component
export function UsersTable() {

	// Usestes for users, loading screen and for errors.
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Function to fetch users from API
		async function fetchUsers() {
			try {
				setIsLoading(true);  // Show loading state

				// Call your API
				const response = await fetch('/api/user', {
					method: 'GET'
				});

				// Check if request was successful
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}

				// Convert response to JSON
				const data = await response.json();

				// Update state with the data
				setUsers(data);
				setError(null);  // Clear any previous errors

			} catch (err) {
				console.error('Error fetching users:', err);
				setError('Failed to load users. Please try again.');
			} finally {
				setIsLoading(false);  // Hide loading state
			}
		}

		// Call the function
		fetchUsers();
	}, []); // Empty array means: only run once when component loads

	// Show loading state
	if (isLoading) {
		return (
			<div className="bg-white rounded-lg shadow p-12 text-center">
				<p className="text-gray-600">Loading users...</p>
			</div>
		);
	}

	// Show error state
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
		<div className="bg-white rounded-lg shadow p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-blue-900">Users Management</h2>
				<button className="p-4
				 text-left
				 px-4
				 py-3
				 bg-green-300
				 border
				 shadow-lg
				 border-gray-300
				 rounded-lg
				 text-lg
				 font-bold
				 text-gray-900
				 hover:bg-green-600
				 hover:border-white
				 hover:text-white transition">Add User</button>
			</div>
			<div>
				{/* Table header */}
				<table className="w-full">
					<thead className="bg-gray-50 border-b-2 border-gray-200">
						<tr>
							<th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">ID</th>
							<th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Email</th>
							<th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Role</th>
							<th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Created At</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Modify</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody className="divide-y divide-gray-200">
						{users.map((user) => {
							return (
								<tr key={user.id} className="hover:bg-gray-50 transition">
									<td className="px-6 py-4 text-center text-sm text-gray-900">{user.id}</td>
									<td className="px-6 py-4 text-center text-sm text-gray-600">{user.email}</td>
									<td className="px-6 py-4 text-center">
										<span className={`px-3 py-1 rounded-full text-center text-xs font-semibold
											${user.role === 'admin'
												? 'bg-purple-100 text-purple-800'
												: 'bg-blue-100 text-blue-800'}`}>
											{user.role}
										</span>
									</td>
									<td className="px-6 py-4 text-center text-sm text-gray-600">{user.createdAt}</td>
									<td className="px-6 py-4">
										<div className="flex gap-2">
											<button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
												Edit
											</button>
											<button className="px-3 py-1 bg-red-500 text-center text-white rounded hover:bg-red-600 text-sm">
												Delete
											</button>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}