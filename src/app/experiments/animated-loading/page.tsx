"use client";

import Link from "next/link";
import { useState } from "react";
import { LoadingBreadcrumb } from "@/components/ui/animated-loading-svg-text-shimmer";

const DEMO_LABELS = [
  "Cooking",
  "Thinking",
  "Analyzing",
  "Generating",
  "Processing",
];

export default function AnimatedLoadingExperiment() {
  const [activeLabel, setActiveLabel] = useState(DEMO_LABELS[0]);

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
          Animated loading breadcrumb
        </h1>
        <p className="text-[var(--muted)] mb-12">
          SVG path stroke animation paired with a shimmer text label and a
          chevron — a minimal loading indicator for AI agent states.
        </p>

        <section className="space-y-16">
          {/* Live demo */}
          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6">
              Live preview
            </h2>
            <div className="flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-16">
              <LoadingBreadcrumb text={activeLabel} />
            </div>
          </div>

          {/* Label picker */}
          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
              Try different labels
            </h2>
            <div className="flex flex-wrap gap-2">
              {DEMO_LABELS.map((label) => (
                <button
                  key={label}
                  onClick={() => setActiveLabel(label)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeLabel === label
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-200 bg-transparent text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6">
              Variants
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--muted)]">Default</span>
                <LoadingBreadcrumb />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--muted)]">Thinking</span>
                <LoadingBreadcrumb text="Thinking" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--muted)]">Generating response</span>
                <LoadingBreadcrumb text="Generating response" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
