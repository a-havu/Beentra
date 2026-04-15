"use client";
import { useState } from "react";
import { useEffect } from "react";
import AddUser from "./AddUser";
import ShowUser from "./ShowUser";
import DeleteUser from "./DeleteUser";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import EditUser from "./EditUser";
import { User, OauthAccount } from "@/lib/generated/prisma/client";

type UserWithOAuth = User & { oauthAccount?: OauthAccount[] };

const MAX_PER_PAGE = 10;

// The table component
export function UsersTable() {
  // Usestates for users, loading screen and for errors.
  const [users, setUsers] = useState<UserWithOAuth[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserWithOAuth | null>(null);
  const [editingUser, setEditingUser] = useState<UserWithOAuth | null>(null);

  // Pagenation
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / MAX_PER_PAGE);
  const paginated = users.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE);

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

  const handleEditUser = (updatedUser: UserWithOAuth) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id
          ? { ...updatedUser, oauthAccount: user.oauthAccount }
          : user,
      ),
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
        <Button onClick={() => window.location.reload()} variant="edit">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-[#255a8b]">
            Users Management
          </h2>

          <AddUser onSuccess={onSuccess} />
        </div>
        <div>
          {/* Table header */}
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="hidden md:table-cell px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Username
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Modify
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {paginated.map((user, index) => {
                //
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="hidden md:table-cell px-6 py-4 text-center text-sm text-gray-900">
                      {index + 1 + (page - 1) * MAX_PER_PAGE}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-center">
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
                    <td className="hidden md:table-cell px-6 py-4 text-center text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-center">
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
                          disabled={user.email === "admin@beentra.fi"}
                          dashboard={true}
                          variant="edit"
                          onClick={() => setEditingUser(user)}
                        >
                          Edit
                        </Button>
                        <DeleteUser
                          role={user.role}
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
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-gray-100 border-2 border-gray-200 disabled:opacity-40 hover:bg-gray-200 hover:cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-xl ${
                  p === page
                    ? "bg-[#255a8b] text-white"
                    : "bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 hover:cursor-pointer"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-gray-100 border-2 border-gray-200 disabled:opacity-40 hover:bg-gray-200 hover:cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
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
              isOAuth={
                !!editingUser.oauthAccount &&
                editingUser.oauthAccount.length > 0
              }
              onSuccess={handleEditUser}
              onCancel={() => setEditingUser(null)}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
