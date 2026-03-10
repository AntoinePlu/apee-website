"use client";

import Link from "next/link";
import AnimatedCardStack from "@/components/ui/animate-card-animation";

export default function CardStackExperiment() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <Link
          href="/experiments"
          className="mb-8 inline-block text-sm text-[var(--muted)] transition-colors hover:text-foreground"
        >
          ← Back to experiments
        </Link>

        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          Animated card stack
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          A spring-animated deck of cards that cycles through on button press —
          the front card exits downward while a new one enters from behind.
        </p>

        <section className="flex flex-col items-center">
          <AnimatedCardStack />
        </section>
      </main>
    </div>
  );
}
