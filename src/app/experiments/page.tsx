import Link from "next/link";
import { EXPERIMENTS } from "./experiments.config";

function Nav({ current }: { current?: "experiments" }) {
  return (
    <nav className="flex justify-between text-sm text-[var(--muted)]">
      <Link href="/" className="font-medium text-foreground hover:text-foreground">
        apee
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
        <Link href="/track-records" className="hover:text-foreground transition-colors">
          Track records
        </Link>
        <Link href="/stack" className="hover:text-foreground transition-colors">
          Stack
        </Link>
        <Link
          href="/experiments"
          className={current === "experiments" ? "text-foreground" : "hover:text-foreground transition-colors"}
        >
          Experiments
        </Link>
      </div>
    </nav>
  );
}

export default function ExperimentsGallery() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <header className="mb-16">
          <Nav current="experiments" />
        </header>

        <section className="space-y-10">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Experiments
            </h1>
            <p className="mt-3 text-lg text-[var(--muted)] max-w-xl">
              Design and interaction experiments—playground for motion, layout, and UI ideas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-1">
            {EXPERIMENTS.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiments/${exp.slug}`}
                className="group block rounded-xl border border-[var(--muted)]/30 bg-background p-6 transition-colors hover:border-[var(--muted)] hover:bg-[var(--muted)]/5"
              >
                <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-[var(--accent)] transition-colors">
                  {exp.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {exp.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open experiment →
                </span>
              </Link>
            ))}
          </div>

          {EXPERIMENTS.length === 0 && (
            <p className="text-[var(--muted)]">
              No experiments yet. Add entries to <code className="text-foreground text-sm bg-[var(--muted)]/20 px-1.5 py-0.5 rounded">experiments.config.ts</code> and create a page under <code className="text-foreground text-sm bg-[var(--muted)]/20 px-1.5 py-0.5 rounded">experiments/[slug]/page.tsx</code>.
            </p>
          )}
        </section>

        <footer className="mt-24 border-t border-[var(--muted)]/30 pt-8 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Back home
          </Link>
        </footer>
      </main>
    </div>
  );
}
