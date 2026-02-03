"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteUser } from "@/lib/actions/auth-actions";

export default function AdminUserByIdPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch user");
        }

        setUser(data.data || data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      const result = await deleteUser(id);

      if (!result.success) {
        setError(result.message);
        return;
      }

      router.push("/admin/users");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">User Details</h1>
          <p className="mt-1 text-sm text-gray-600">ID: {id}</p>
        </div>

        {id ? (
          <div className="flex gap-3">
            <Link
              href={`/admin/${id}/edit`}
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting || loading}
              className="inline-flex h-10 items-center justify-center rounded-full bg-red-600 px-5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ) : null}
      </div>

      {loading ? (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 text-sm text-gray-700">
          Loading user details...
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Error: {error}
        </div>
      ) : null}

      {user && !loading ? (
        <div className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <InfoRow label="ID" value={user.id || user._id || "N/A"} />
          <InfoRow label="Name" value={user.name || "—"} />
          <InfoRow label="Email" value={user.email || "—"} />
          <InfoRow label="Role" value={user.role || "—"} />

          {user.createdAt ? (
            <InfoRow
              label="Created"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          ) : null}

          {user.updatedAt ? (
            <InfoRow
              label="Updated"
              value={new Date(user.updatedAt).toLocaleDateString()}
            />
          ) : null}
        </div>
      ) : null}

      {!loading && !user && !error ? (
        <p className="mt-6 text-sm text-gray-700">No user found with ID: {id}</p>
      ) : null}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-black/5 py-4 last:border-b-0">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
