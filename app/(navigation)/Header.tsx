"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/courts", label: "Courts" },
  { href: "/book", label: "Book a Court" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

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
        </div>
      </div>
    </header>
  );
}
