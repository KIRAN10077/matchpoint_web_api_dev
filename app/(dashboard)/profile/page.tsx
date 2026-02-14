"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleUpdateProfile } from "@/lib/actions/auth-actions";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];

    if (!userCookie) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(decodeURIComponent(userCookie));
      setUser(userData);
      setFormData({ name: userData.name, email: userData.email });
    } catch (e) {
      console.error("Failed to parse user cookie", e);
      router.push("/login");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await handleUpdateProfile(formData);

      if (result.success) {
        setUser(result.data);
        setIsEditing(false);
        setMessage({ type: "success", text: "Profile updated successfully!" });
        
        // Update the cookie
        document.cookie = `user=${encodeURIComponent(JSON.stringify(result.data))}; path=/`;
        
        // Refresh header by triggering a storage event
        window.dispatchEvent(new Event("storage"));
      } else {
        setMessage({ 
          type: "error", 
          text: result.message || "Failed to update profile. Please try again." 
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-500/20 border border-green-500/50 text-green-300"
                  : "bg-red-500/20 border border-red-500/50 text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Name</label>
                <p className="text-lg text-white">{user.name}</p>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Email</label>
                <p className="text-lg text-white">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Role</label>
                <p className="text-lg text-white capitalize">{user.role}</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-semibold bg-white text-black hover:opacity-90 transition"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-semibold bg-white text-black hover:opacity-90 transition disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: user.name, email: user.email });
                    setMessage(null);
                  }}
                  disabled={isLoading}
                  className="inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 border border-white/10 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
