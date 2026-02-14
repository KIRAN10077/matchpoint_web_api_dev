"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/courts", label: "Courts" },
  { href: "/book", label: "Book a Court" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/about", label: "About" },
];

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];

    if (userCookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(userCookie)));
      } catch (e) {
        console.error("Failed to parse user cookie", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background blur layer */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-xl border-b border-white/10" />

      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/home" className="flex items-center gap-2">
          <Image
            src="/matchpoint_logo_final.png"
            alt="Matchpoint"
            width={28}
            height={28}
            priority
          />
          <span className="font-semibold tracking-tight text-white">
            Matchpoint
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "px-4 py-2 text-sm rounded-full transition",
                  active
                    ? "bg-white text-black"
                    : "text-white/80 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 border border-white/10 transition"
              >
                {user.name}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 border border-white/10 shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm text-white">{user.name}</p>
                    <p className="text-xs text-white/60">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => {
                      document.cookie = "token=; path=/; max-age=0";
                      document.cookie = "user=; path=/; max-age=0";
                      document.cookie = "role=; path=/; max-age=0";
                      window.location.href = "/login";
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 border border-white/10"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold bg-white text-black hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
