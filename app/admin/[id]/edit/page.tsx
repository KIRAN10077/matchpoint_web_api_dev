"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/api/axios";

type UserDTO = {
  _id: string;
  name?: string;
  email?: string;
  role?: "user" | "admin";
  image?: string;
  createdAt?: string;
};

export default function AdminUserEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  const [user, setUser] = useState<UserDTO | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const hasChanges = useMemo(() => {
    if (!user) return false;
    return (
      name !== (user.name ?? "") ||
      email !== (user.email ?? "") ||
      role !== (user.role ?? "user") ||
      password.length > 0 ||
      !!image
    );
  }, [user, name, email, role, password, image]);

  const fetchUser = async (userId: string) => {
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/admin/users/${userId}`);
      const u: UserDTO | undefined = res.data?.data;
      if (!u) throw new Error("User not found");

      setUser(u);
      setName(u.name ?? "");
      setEmail(u.email ?? "");
      setRole((u.role as any) ?? "user");
      setPassword("");
      setImage(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) return;

    setError("");
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);
      if (password.trim()) formData.append("password", password.trim());
      if (image) formData.append("image", image);

      const res = await axiosInstance.put(`/api/admin/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated = res.data?.data as UserDTO | undefined;
      if (updated) {
        setUser(updated);
        setName(updated.name ?? "");
        setEmail(updated.email ?? "");
        setRole((updated.role as any) ?? "user");
        setPassword("");
        setImage(null);
      } else {
        await fetchUser(id);
      }

      router.push(`/admin/${id}`);
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-gray-700">
        Loading route params...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        <p className="font-semibold">Failed to load user</p>
        <p className="mt-1">ID: {id}</p>
        <p className="mt-2">{error}</p>
        <button
          onClick={() => fetchUser(id)}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-red-200 bg-white px-5 text-sm font-semibold text-red-700 hover:bg-red-50"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-gray-700">
        User not found
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit User</h1>
        <p className="mt-1 text-sm text-gray-600">ID: {id}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-xl rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4">
          <Field label="Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-teal-700"
              required
            />
          </Field>

          <Field label="Email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-teal-700"
              required
            />
          </Field>

          <Field label="Role">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "user" | "admin")}
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-teal-700"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </Field>

          <Field label="New Password (optional)">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="leave blank to keep current"
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-teal-700"
            />
          </Field>

          <Field label="Replace Image (optional)">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
          </Field>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => router.push(`/admin/${id}`)}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || !hasChanges}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-teal-800 px-6 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-gray-800">
      <span className="text-xs text-gray-600">{label}</span>
      {children}
    </label>
  );
}
