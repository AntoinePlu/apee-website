"use client";

import Link from "next/link";
import { Component } from "@/components/ui/inline-dropdown";

export default function InlineDropdownExperiment() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <Link
          href="/experiments"
          className="inline-block text-sm text-[var(--muted)] hover:text-foreground transition-colors mb-8"
        >
          ← Back to experiments
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Inline dropdown
        </h1>
        <p className="text-[var(--muted)] mb-12">
          A compact context menu with animated transitions — toggle favorites,
          rename inline, and hold to confirm destructive actions.
        </p>

        <section className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-20">
          <Component />
        </section>
      </main>
    </div>
  );
}
