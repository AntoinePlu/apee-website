"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

function DemoLabel({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="mb-3">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}

function DefaultDemo() {
  return (
    <div>
      <DemoLabel
        label="Default"
        description="Squares fade in and out across the grid at a gentle pace."
      />
      <div className="relative h-52 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.12}
          duration={3}
          repeatDelay={0.5}
          className="text-neutral-400"
        />
      </div>
    </div>
  );
}

function RadialMaskDemo() {
  return (
    <div>
      <DemoLabel
        label="Radial mask"
        description="A radial gradient mask fades the grid out toward the edges — classic hero treatment."
      />
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
        <p className="relative z-10 text-2xl font-semibold tracking-tight text-neutral-900">
          Something is loading…
        </p>
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "text-neutral-400",
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-20%] h-[140%]",
          )}
        />
      </div>
    </div>
  );
}

function DarkDemo() {
  return (
    <div>
      <DemoLabel
        label="Dark surface"
        description="Higher opacity squares on a dark background — visible grid lines and dramatic flash."
      />
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-neutral-950">
        <AnimatedGridPattern
          numSquares={25}
          maxOpacity={0.25}
          duration={2.5}
          repeatDelay={0.3}
          className="text-white"
        />
      </div>
    </div>
  );
}

function SkewedDemo() {
  return (
    <div>
      <DemoLabel
        label="Skewed + tall"
        description="Grid taller than its container and skewed — creates a perspective floor effect."
      />
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <p className="relative z-10 text-xl font-semibold tracking-tight text-neutral-800">
          Build something people love
        </p>
        <AnimatedGridPattern
          numSquares={35}
          maxOpacity={0.08}
          duration={4}
          repeatDelay={0.8}
          className={cn(
            "text-neutral-500",
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
      </div>
    </div>
  );
}

function ColorDemo() {
  return (
    <div>
      <DemoLabel
        label="Colour accent"
        description="Violet squares on a dark indigo card — tinted grid as ambient decoration."
      />
      <div className="relative flex h-52 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-950">
        <p className="relative z-10 text-sm font-medium uppercase tracking-widest text-indigo-300">
          New feature
        </p>
        <p className="relative z-10 text-2xl font-semibold text-white">
          AI-powered insights
        </p>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.2}
          duration={3}
          repeatDelay={0.5}
          className={cn(
            "text-violet-400",
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          )}
        />
      </div>
    </div>
  );
}

function DashedDemo() {
  return (
    <div>
      <DemoLabel
        label="Dashed grid lines"
        description="strokeDasharray makes the grid lines dashed instead of solid."
      />
      <div className="relative h-52 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <AnimatedGridPattern
          numSquares={20}
          maxOpacity={0.15}
          duration={3.5}
          repeatDelay={0.6}
          strokeDasharray={4}
          className="text-neutral-500"
        />
      </div>
    </div>
  );
}

export default function AnimatedGridExperiment() {
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
          Animated grid pattern
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          An SVG grid where random squares animate in and out — works great as a
          hero or card background with a mask.
        </p>

        <section className="space-y-10">
          <DefaultDemo />
          <RadialMaskDemo />
          <DarkDemo />
          <SkewedDemo />
          <ColorDemo />
          <DashedDemo />
        </section>
      </main>
    </div>
  );
}
