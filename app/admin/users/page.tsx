"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api/axios";

type UserRow = {
  _id: string;
  name?: string;
  email?: string;
  role?: "user" | "admin";
  createdAt?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/admin/users");
      setUsers(res.data?.data ?? []);
    } catch (err: unknown) {
      // @ts-expect-error - axios error shape
      const serverMsg = err?.response?.data?.message;
      setError(
        serverMsg || (err instanceof Error ? err.message : "Failed to load users")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all registered users.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={fetchUsers}
            className="h-10 rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Refresh
          </button>

          <Link
            href="/admin/users/create"
            className="inline-flex h-10 items-center justify-center rounded-full bg-teal-800 px-5 text-sm font-semibold text-white hover:opacity-90"
          >
            + Create User
          </Link>
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 text-sm text-gray-700">
          Loading users...
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {/* Table */}
      {!loading && !error ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-black/5">
                {users.length === 0 ? (
                  <tr>
                    <td className="px-5 py-6 text-gray-600" colSpan={5}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/70">
                      <td className="px-5 py-4 font-mono text-xs text-gray-600">
                        {u._id}
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {u.name ?? "-"}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {u.email ?? "-"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                            (u.role === "admin"
                              ? "bg-teal-50 text-teal-800"
                              : "bg-gray-100 text-gray-700")
                          }
                        >
                          {u.role ?? "-"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/${u._id}`}
                            className="text-sm font-semibold text-teal-800 hover:underline"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/${u._id}/edit`}
                            className="text-sm font-semibold text-gray-800 hover:underline"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
