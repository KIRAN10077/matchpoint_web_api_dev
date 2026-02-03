import type { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative w-full">
      {/* Background image */}
      <Image
        src="/background_matchpoint.jpg"
        alt="Matchpoint background"
        fill
        priority
        className="fixed inset-0 -z-10 object-cover"
      />

      {/* Optional dark overlay for readability */}
      <div className="fixed inset-0 -z-10 bg-black/50" />

      {/* Content (centered below header) */}
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
