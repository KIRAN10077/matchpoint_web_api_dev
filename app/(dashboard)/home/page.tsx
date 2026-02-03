import type React from "react";

export default function HomePage() {
  return (
    <main className="w-full">
      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url(/background_home.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          {/* soft brand glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,200,0.22),_transparent_55%)]" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 text-white">
          <span
            className="mb-4 inline-block w-fit rounded-full bg-white/10 px-4 py-1 text-xs font-medium backdrop-blur"
            style={{ animation: "mp-fade-in 700ms ease-out both" }}
          >
            Matchpoint · Court Booking
          </span>

          <h1
            className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
            style={{ animation: "mp-fade-up 800ms ease-out both" }}
          >
            Book courts easily.
            <br />
            Play more, stress less.
          </h1>

          <p
            className="mt-5 max-w-xl text-base text-white/85 md:text-lg"
            style={{ animation: "mp-fade-up 900ms ease-out both" }}
          >
            Find nearby courts, check real-time availability, and reserve your
            slot in seconds — built for players and clubs.
          </p>

          <div
            className="mt-8 flex gap-4"
            style={{ animation: "mp-fade-up 1000ms ease-out both" }}
          >
            <a
              href="/book"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:opacity-90 hover:-translate-y-[1px]"
            >
              Book a Court
            </a>
            <a
              href="/courts"
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-[1px]"
            >
              Explore Courts
            </a>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      {/* Gradient wash background (not flat white) */}
      <div className="relative text-black">
        {/* Background layer */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-[#f8fbfa] via-[#eefaf6] to-[#f8fbfa]" />
          {/* subtle teal/green blobs */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(0,190,160,0.14),_transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,_rgba(0,140,120,0.10),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,_rgba(0,210,170,0.10),_transparent_55%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4">
          {/* VALUE PROPS */}
          <section className="py-24">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard
                title="Real-time availability"
                desc="See open slots instantly without phone calls or waiting."
                icon={<IconClock />}
              />
              <InfoCard
                title="Fast & simple booking"
                desc="Reserve your court in just a few clean, guided steps."
                icon={<IconCalendar />}
              />
              <InfoCard
                title="Manage bookings"
                desc="All your upcoming and past sessions in one place."
                icon={<IconList />}
              />
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-24">
            <div
              className="mb-14 text-center"
              style={{ animation: "mp-fade-up 700ms ease-out both" }}
            >
              <h2 className="text-3xl font-semibold">How Matchpoint works</h2>
              <p className="mt-3 text-gray-600">
                A simple flow designed for convenience.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <Step
                step="01"
                title="Choose a venue"
                desc="Browse courts and select the location you prefer."
              />
              <Step
                step="02"
                title="Pick a time"
                desc="Select from available time slots that fit your schedule."
              />
              <Step
                step="03"
                title="Confirm booking"
                desc="Secure your court instantly with clear confirmation."
              />
            </div>
          </section>

          {/* POPULAR COURTS */}
          <section className="py-24">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Popular courts</h2>
                <p className="mt-1 text-gray-600">
                  Trusted by players across the city.
                </p>
              </div>
              <a
                href="/courts"
                className="text-sm font-medium text-teal-800 hover:underline"
              >
                View all
              </a>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <CourtCard
                name="Prime Court"
                meta="Indoor · 5 courts"
                image="/prime_court.jpg"
              />
              <CourtCard
                name="ABC Court"
                meta="Outdoor · 4 courts"
                image="/abc_court.jpg"
              />
              <CourtCard
                name="Surya Futsal"
                meta="Indoor · 6 courts"
                image="/surya_futsal.png"
              />
              <CourtCard
                name="XYZ Arena"
                meta="Outdoor · 3 courts"
                image="/xyz_arena.jpg"
              />
            </div>
          </section>

          {/* CTA */}
          <section className="py-28">
            <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center text-white">
              {/* CTA gradient (brand) */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b3f3a] via-[#0a5b4f] to-[#0b3f3a]" />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,_rgba(0,255,200,0.20),_transparent_45%)]" />
              <div className="absolute inset-0 -z-10 bg-black/15" />

              <h2 className="text-3xl font-semibold">
                Ready to book your next session?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                Discover courts near you and lock in your preferred time today.
              </p>

              <div className="mt-10 flex justify-center gap-4">
                <a
                  href="/book"
                  className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:opacity-90 hover:-translate-y-[1px]"
                >
                  Book now
                </a>
                <a
                  href="/about"
                  className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-[1px]"
                >
                  Learn more
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function InfoCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border border-black/5 bg-white/75 p-8 shadow-sm backdrop-blur transition
                 hover:-translate-y-1 hover:shadow-md"
      style={{ animation: "mp-fade-up 650ms ease-out both" }}
    >
      <div className="mb-5 text-teal-700">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Step({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="rounded-2xl border border-black/5 bg-white/75 p-8 shadow-sm backdrop-blur transition
                 hover:-translate-y-1 hover:shadow-md"
      style={{ animation: "mp-fade-up 700ms ease-out both" }}
    >
      <span className="text-sm font-semibold text-teal-700">{step}</span>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function CourtCard({
  name,
  meta,
  image,
}: {
  name: string;
  meta: string;
  image: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-black/5 bg-white/80 shadow-sm backdrop-blur transition
                 hover:-translate-y-1 hover:shadow-md"
      style={{ animation: "mp-fade-up 750ms ease-out both" }}
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-300 hover:scale-[1.04]"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{meta}</p>
        <a
          href="/book"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-800 hover:underline"
        >
          Book →
        </a>
      </div>
    </div>
  );
}

/* ================= ICONS ================= */

function IconClock() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="14" cy="14" r="12" />
      <path d="M14 8v6l4 2" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="22" height="18" rx="2" />
      <path d="M8 2v4M20 2v4M3 10h22" />
    </svg>
  );
}

function IconList() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 6h13M8 14h13M8 22h13" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="14" r="1" />
      <circle cx="4" cy="22" r="1" />
    </svg>
  );
}
