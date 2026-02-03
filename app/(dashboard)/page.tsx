import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="relative h-screen w-full overflow-hidden text-white">
      {/* Background */}
      <Image
        src="/background_landingpage.jpg"
        alt="Matchpoint landing background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,200,0.22),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,_rgba(0,160,140,0.16),_transparent_45%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        {/* Logo + Brand */}
        <div
          className="mb-6 flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
          style={{ animation: "mp-fade-in 700ms ease-out both" }}
        >
          <Image
            src="/matchpoint_logo_final.png"
            alt="Matchpoint"
            width={34}
            height={34}
            priority
          />
          <span className="text-sm font-semibold tracking-wide">Matchpoint</span>
        </div>

        {/* Headline */}
        <h1
          className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
          style={{ animation: "mp-fade-up 800ms ease-out both" }}
        >
          Book courts in seconds.
          <br />
          Play more, stress less.
        </h1>

        {/* Subtitle */}
        <p
          className="mt-5 max-w-2xl text-sm text-white/80 md:text-lg"
          style={{ animation: "mp-fade-up 950ms ease-out both" }}
        >
          Real-time availability, fast bookings, and a clean experience for players
          and clubs — all in one place.
        </p>

        {/* Buttons */}
        <div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          style={{ animation: "mp-fade-up 1100ms ease-out both" }}
        >
          <Link
            href="/home"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition hover:opacity-90 hover:-translate-y-[1px]"
          >
            Enter Home
          </Link>

          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:-translate-y-[1px]"
          >
            Log in
          </Link>
        </div>

        {/* Small trust line */}
        <p
          className="mt-8 text-xs text-white/65"
          style={{ animation: "mp-fade-in 1300ms ease-out both" }}
        >
          Trusted by players & clubs • Simple scheduling • Clean UI
        </p>
      </div>
    </main>
  );
}
