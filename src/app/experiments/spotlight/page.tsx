"use client";

import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";

function DemoLabel({ label, description }: { label: string; description: string }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}

function BorderGlowCard() {
  return (
    <div>
      <DemoLabel
        label="Border glow"
        description="Spotlight on the border wrapper — glow traces the cursor along the edge."
      />
      <div className="relative h-40 rounded-xl bg-neutral-200/40 p-px">
        <Spotlight
          color="rgba(37, 99, 235, 0.8)"
          size={140}
          className="blur-2xl"
        />
        <div className="relative h-full w-full overflow-hidden rounded-[11px] bg-white" />
      </div>
    </div>
  );
}

function LargeWhiteCard() {
  return (
    <div>
      <DemoLabel
        label="Large soft spotlight"
        description="A big, slow-spring glow on a dark surface."
      />
      <div className="relative h-40 overflow-hidden rounded-xl bg-neutral-900">
        <Spotlight
          color="rgba(255, 255, 255, 0.18)"
          size={320}
          springOptions={{ stiffness: 60, damping: 20 }}
          className="blur-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm font-medium text-neutral-500 select-none">
            Hover me
          </p>
        </div>
      </div>
    </div>
  );
}

function ColorShiftCard() {
  return (
    <div>
      <DemoLabel
        label="Colour shift"
        description="Amber spotlight on a neutral card — tight spring, snappy follow."
      />
      <div className="relative h-40 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
        <Spotlight
          color="rgba(251, 146, 60, 0.45)"
          size={200}
          springOptions={{ stiffness: 200, damping: 30 }}
          className="blur-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm font-medium text-neutral-500 select-none">
            Hover me
          </p>
        </div>
      </div>
    </div>
  );
}

function GridCard() {
  return (
    <div>
      <DemoLabel
        label="Grid reveal"
        description="Spotlight uncovers a dot-grid pattern underneath."
      />
      <div
        className="relative h-40 overflow-hidden rounded-xl bg-neutral-950"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff18 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <Spotlight
          color="rgba(167, 139, 250, 0.5)"
          size={240}
          springOptions={{ stiffness: 100, damping: 25 }}
          className="blur-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm font-medium text-neutral-700 select-none">
            Hover me
          </p>
        </div>
      </div>
    </div>
  );
}

function CardGridDemo() {
  const cards = [
    { title: "Revenue", value: "$48,210", change: "+12.4%" },
    { title: "Users", value: "9,302", change: "+3.1%" },
    { title: "Requests", value: "1.2M", change: "+28%" },
    { title: "Uptime", value: "99.98%", change: "−0.01%" },
  ];

  return (
    <div>
      <DemoLabel
        label="Stat cards"
        description="Each card is its own spotlight target — glow is isolated to the hovered card."
      />
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5"
          >
            <Spotlight
              color="rgba(14, 165, 233, 0.35)"
              size={180}
              springOptions={{ stiffness: 150, damping: 28 }}
              className="blur-2xl"
            />
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              {card.title}
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
              {card.value}
            </p>
            <p className="mt-0.5 text-xs text-neutral-400">{card.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SpotlightExperiment() {
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
          Spotlight
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          A spring-animated radial glow that follows the cursor inside its
          parent container.
        </p>

        <section className="space-y-10">
          <BorderGlowCard />
          <LargeWhiteCard />
          <ColorShiftCard />
          <GridCard />
          <CardGridDemo />
        </section>
      </main>
    </div>
  );
}
