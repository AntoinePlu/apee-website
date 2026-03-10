"use client";

import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

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
        description="Neutral grid on white — subtle dot pattern with gentle flicker."
      />
      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#a3a3a3"
          maxOpacity={0.4}
          flickerChance={0.08}
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
        description="White squares on near-black — high-contrast noise texture."
      />
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-neutral-950">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#ffffff"
          maxOpacity={0.18}
          flickerChance={0.12}
        />
      </div>
    </div>
  );
}

function ColorDemo() {
  return (
    <div>
      <DemoLabel
        label="Colour tint"
        description="Blue squares at low opacity — works as a background texture behind content."
      />
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-blue-950">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={5}
          color="#60a5fa"
          maxOpacity={0.35}
          flickerChance={0.1}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <p className="text-lg font-semibold text-white">Content on top</p>
          <p className="text-sm text-blue-300">The grid stays behind via z-index</p>
        </div>
      </div>
    </div>
  );
}

function LargeSquareDemo() {
  return (
    <div>
      <DemoLabel
        label="Large squares"
        description="Bigger cells and wider gaps — closer to a mosaic than a texture."
      />
      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={12}
          gridGap={4}
          color="#6366f1"
          maxOpacity={0.2}
          flickerChance={0.06}
        />
      </div>
    </div>
  );
}

function FastFlickerDemo() {
  return (
    <div>
      <DemoLabel
        label="Fast flicker"
        description="High flickerChance — chaotic, rapidly cycling opacity."
      />
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-neutral-900">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={3}
          gridGap={3}
          color="#34d399"
          maxOpacity={0.5}
          flickerChance={0.6}
        />
      </div>
    </div>
  );
}

function HeroBannerDemo() {
  return (
    <div>
      <DemoLabel
        label="Hero banner"
        description="Full-width card with a flickering grid as ambient texture."
      />
      <div className="relative h-56 w-full overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#ffffff"
          maxOpacity={0.08}
          flickerChance={0.05}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            Ambient background
          </p>
          <p className="text-2xl font-semibold text-white">
            Build something people love
          </p>
          <p className="max-w-sm text-sm text-neutral-400">
            Subtle motion in the background creates depth without distracting
            from the message.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FlickeringGridExperiment() {
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
          Flickering grid
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          A canvas-drawn grid of squares that randomly flicker their opacity —
          useful as ambient texture or hero backgrounds.
        </p>

        <section className="space-y-10">
          <DefaultDemo />
          <DarkDemo />
          <ColorDemo />
          <LargeSquareDemo />
          <FastFlickerDemo />
          <HeroBannerDemo />
        </section>
      </main>
    </div>
  );
}
