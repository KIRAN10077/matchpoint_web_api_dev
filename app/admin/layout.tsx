import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f9f8] text-black">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 border-r border-black/10 bg-white/70 backdrop-blur">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Image
                src="/matchpoint_logo_final.png"
                alt="Matchpoint"
                width={34}
                height={34}
                priority
              />
              <div>
                <p className="text-sm font-semibold leading-none">Matchpoint</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-b from-[#eefaf6] to-white p-4">
              <p className="text-xs font-semibold text-teal-800">Admin Panel</p>
              <p className="mt-1 text-xs text-gray-600">
                Manage users & access.
              </p>
            </div>
          </div>

          <nav className="px-4 pb-6">
            <p className="px-2 pb-2 text-[11px] font-semibold text-gray-500">
              MANAGEMENT
            </p>

            <div className="space-y-2">
              <Link
                href="/admin/users"
                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-800 hover:bg-[#eefaf6]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eefaf6] text-teal-800 group-hover:bg-white">
                  <UsersIcon />
                </span>
                Users
              </Link>

              <Link
                href="/admin/users/create"
                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-800 hover:bg-[#eefaf6]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eefaf6] text-teal-800 group-hover:bg-white">
                  <PlusIcon />
                </span>
                Create User
              </Link>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="relative flex-1">
          {/* Soft background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbfa] via-[#eefaf6] to-[#f8fbfa]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(0,190,160,0.12),_transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,_rgba(0,140,120,0.10),_transparent_50%)]" />
          </div>

          <div className="p-6 sm:p-10">
            <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11.5 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
