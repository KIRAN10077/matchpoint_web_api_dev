"use client";

import { useState } from "react";
import axiosInstance from "@/lib/api/axios";

export default function AdminCreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (image) formData.append("image", image);

      const res = await axiosInstance.post("/api/admin/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data?.message || "User created");
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setImage(null);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create User</h1>
        <p className="mt-1 text-sm text-gray-600">
          Add a new user to the platform.
        </p>
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
              placeholder="John"
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-teal-700"
              required
            />
          </Field>

          <Field label="Email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@test.com"
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-teal-700"
              required
            />
          </Field>

          <Field label="Password">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password123"
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

          <Field label="Image (optional)">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-teal-800 px-6 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create User"}
          </button>

          {message ? (
            <p className="text-sm text-gray-700">{message}</p>
          ) : null}
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
