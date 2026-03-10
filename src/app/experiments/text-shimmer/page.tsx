"use client";

import Link from "next/link";
import { TextShimmer } from "@/components/ui/text-shimmer";

function TextShimmerBasic() {
  return (
    <TextShimmer className="font-mono text-sm" duration={1}>
      Generating code...
    </TextShimmer>
  );
}

function TextShimmerColor() {
  return (
    <TextShimmer
      duration={1.2}
      className="text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
    >
      Hi, how are you?
    </TextShimmer>
  );
}

export default function TextShimmerExperiment() {
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
          Text shimmer
        </h1>
        <p className="text-[var(--muted)] mb-12">
          Animated text with a moving gradient shimmer. Built with Framer Motion.
        </p>

        <section className="space-y-16">
          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
              Basic (mono, short duration)
            </h2>
            <TextShimmerBasic />
          </div>

          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
              Custom color (blue theme)
            </h2>
            <TextShimmerColor />
          </div>
        </section>
      </main>
    </div>
  );
}
