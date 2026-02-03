export default function AboutPage() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] text-white">
      {/* Stable fixed background (NO next/image) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/about_background.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
            About Matchpoint
          </p>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">
            Book courts. Play more. Stress less.
          </h1>

          <p className="mt-5 text-base text-white/80 sm:text-lg">
            Matchpoint is a modern court-booking platform designed for players and
            clubs — fast scheduling, real-time availability, and frictionless
            reservations.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/book"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black hover:opacity-90"
            >
              Book a Court
            </a>
            <a
              href="/courts"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
            >
              Explore Courts
            </a>
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Real-time availability"
            desc="See open slots instantly and avoid back-and-forth coordination."
          />
          <Feature
            title="Fast booking"
            desc="Reserve courts in seconds with a clean, guided experience."
          />
          <Feature
            title="Clear confirmations"
            desc="All booking details in one place — simple and reliable."
          />
        </section>

        {/* Mission + Values */}
        <section className="mt-20 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold tracking-tight">Our mission</h2>

            <p className="mt-4 text-white/75 leading-relaxed">
              We help players spend less time planning and more time playing.
              Matchpoint removes friction from court scheduling for individuals,
              groups, and clubs.
            </p>

            <div className="mt-6 rounded-2xl border border-white/15 bg-black/40 p-5">
              <p className="text-sm text-white/85">
                “Every minute saved on planning is a minute gained on the court.”
              </p>
              <p className="mt-2 text-xs text-white/60">— Matchpoint Team</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/15 bg-black/40 p-6">
              <h3 className="text-sm font-semibold text-white">
                What we focus on
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Value title="Clarity" desc="Availability and pricing stay transparent." />
                <Value title="Speed" desc="Booking flows designed for efficiency." />
                <Value title="Fair access" desc="Balanced experience for players and clubs." />
                <Value title="Consistency" desc="Same clean UI on web and mobile." />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <FAQ q="How do I book a court?" a="Select a venue, choose a time slot, and confirm your booking." />
            <FAQ q="Can I manage my bookings?" a="Yes, all reservations are available in the My Bookings section." />
            <FAQ q="Is Matchpoint for clubs too?" a="Yes, clubs can manage courts, schedules, and users." />
            <FAQ q="Which sports are supported?" a="Matchpoint is designed to support multiple court-based sports." />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 rounded-3xl border border-white/15 bg-black/50 p-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Ready to play?</h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75">
            Find a court near you and book your next session in seconds.
          </p>

          <div className="mt-7 flex justify-center">
            <a
              href="/book"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black hover:opacity-90"
            >
              Book now
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/40 p-6">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/75">{desc}</p>
    </div>
  );
}

function Value({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/30 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm text-white/75">{desc}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/40 p-6">
      <p className="text-sm font-semibold text-white">{q}</p>
      <p className="mt-2 text-sm text-white/75">{a}</p>
    </div>
  );
}
