"use client";
import { useState } from "react";
import { useEffect } from "react";
import AddUser from "./AddUser";
import ShowUser from "./ShowUser";
import DeleteUser from "./DeleteUser";
import Input from "../ui/Input";
import Image from "next/image";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import EditUser from "./EditUser";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullName?: string | null;
  createdAt: string;
  isOnline: boolean;
};

// The table component
export function UsersTable() {
  // Usestates for users, loading screen and for errors.
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/user", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Users");
      }

      const data = await response.json();

      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching events: ", err);
      setError("Failed to load events. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setEditingUser(null);
  };

  const onSuccess = () => {
    fetchUsers();
  };

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
    <>
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Users Management</h2>

          <AddUser onSuccess={onSuccess} />
        </div>
        <div>
          {/* Table header */}
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Username
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Modify
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => {
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-center text-xs font-semibold
											${
                        user.isOnline
                          ? "bg-green-100 text-white-900"
                          : "bg-gray-100 text-white-900"
                      }`}
                      >
                        {user.isOnline ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-center text-xs font-semibold
											${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="edit"
                          onClick={() => setEditingUser(user)}
                        >
                          Edit
                        </Button>
                        <DeleteUser
                          id={user.id}
                          onDeleted={() => {
                            setUsers((prev) =>
                              prev.filter((e) => e.id !== user.id),
                            );
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedUser && (
        <ShowUser
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {editingUser && (
        <Modal isOpen={!!editingUser}>
          <ModalBody>
            <EditUser
              user={editingUser}
              onSuccess={handleEditUser}
              onCancel={() => setEditingUser(null)}
            />
          </ModalBody>
          {/* <ModalFooter>
            <Button variant="secondary" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Modal>
      )}
    </>
  );
}
