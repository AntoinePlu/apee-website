"use client";

import Link from "next/link";
import { MorphPanel } from "@/components/ui/ai-input";

export default function AiInputExperiment() {
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
          AI input
        </h1>
        <p className="text-[var(--muted)] mb-12">
          A morphing panel that expands from a compact dock bar into a full
          input form. Click &quot;Ask AI&quot; to open — submit with{" "}
          <kbd className="rounded border px-1 text-xs">⌘ Enter</kbd> or dismiss
          with <kbd className="rounded border px-1 text-xs">Esc</kbd>.
        </p>

        <section className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-20">
          <MorphPanel />
        </section>
      </main>
    </div>
  );
}
