"use client";

import Link from "next/link";
import { useState } from "react";
import { DotsMove } from "@/components/ui/dots-move";
import { ArrowRight, RotateCcw, Loader } from "lucide-react";

function DemoLabel({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

function SizesDemo() {
  const sizes = [
    { label: "12", size: 12 },
    { label: "16", size: 16 },
    { label: "24", size: 24 },
    { label: "32", size: 32 },
    { label: "48", size: 48 },
    { label: "64", size: 64 },
  ];
  return (
    <div>
      <DemoLabel
        label="Sizes"
        description="Scale freely — the conveyor motion stays proportional."
      />
      <div className="flex flex-wrap items-end gap-6">
        {sizes.map(({ label, size }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <DotsMove size={size} />
            <span className="font-mono text-[10px] text-[var(--muted)]">
              {label}px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Colors ───────────────────────────────────────────────────────────────────

function ColorsDemo() {
  const colors = [
    { label: "Blue",    color: "hsl(228, 97%, 42%)" },
    { label: "Indigo",  color: "#6366f1" },
    { label: "Violet",  color: "#8b5cf6" },
    { label: "Rose",    color: "#f43f5e" },
    { label: "Amber",   color: "#f59e0b" },
    { label: "Emerald", color: "#10b981" },
    { label: "Stone",   color: "#78716c" },
    { label: "Black",   color: "#0c0a09" },
  ];
  return (
    <div>
      <DemoLabel
        label="Colors"
        description="Any CSS color — all four dots share the fill."
      />
      <div className="flex flex-wrap items-end gap-6">
        {colors.map(({ label, color }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <DotsMove size={24} color={color} />
            <span className="font-mono text-[10px] text-[var(--muted)]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Speed ────────────────────────────────────────────────────────────────────

function SpeedDemo() {
  const speeds = [
    { label: "Slow",    duration: 1.0 },
    { label: "Default", duration: 0.5 },
    { label: "Fast",    duration: 0.28 },
    { label: "Snappy",  duration: 0.15 },
  ];
  return (
    <div>
      <DemoLabel
        label="Speed"
        description="duration is per-step — lower = faster conveyor."
      />
      <div className="flex flex-wrap items-end gap-10">
        {speeds.map(({ label, duration }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <DotsMove size={28} duration={duration} />
            <span className="font-mono text-[10px] text-[var(--muted)]">
              {label} ({duration}s)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dark surface ─────────────────────────────────────────────────────────────

function DarkSurfaceDemo() {
  const variants = [
    { color: "#ffffff",  label: "White"       },
    { color: "#93c5fd",  label: "Blue 300"    },
    { color: "#a5b4fc",  label: "Indigo 300"  },
    { color: "#6ee7b7",  label: "Emerald 300" },
  ];
  return (
    <div>
      <DemoLabel
        label="On dark"
        description="Light fills on a near-black surface."
      />
      <div className="flex flex-wrap items-end gap-8 rounded-xl bg-neutral-950 px-8 py-8">
        {variants.map(({ color, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <DotsMove size={28} color={color} />
            <span className="font-mono text-[10px] text-neutral-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Side by side comparison ──────────────────────────────────────────────────

function ComparisonDemo() {
  return (
    <div>
      <DemoLabel
        label="Move vs Bounce"
        description="Both loaders at the same size — different rhythm and character."
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-200 py-8">
          <DotsMove size={32} />
          <span className="text-xs text-[var(--muted)]">Move — conveyor</span>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-200 py-8">
          {/* Inline the bounce SVG directly so no import needed */}
          <svg width={32} height={32} fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24">
            <circle cx="4" cy="12" r="3">
              <animate begin="0" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" repeatCount="indefinite" />
            </circle>
            <circle cx="12" cy="12" r="3">
              <animate begin="0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" repeatCount="indefinite" />
            </circle>
            <circle cx="20" cy="12" r="3">
              <animate begin="0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="text-xs text-[var(--muted)]">Bounce — vertical</span>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive speed control ─────────────────────────────────────────────────

function InteractiveDemo() {
  const [duration, setDuration] = useState(0.5);

  return (
    <div>
      <DemoLabel
        label="Interactive"
        description="Drag to control the step duration in real time."
      />
      <div className="flex flex-col items-center gap-6 rounded-xl border border-neutral-200 bg-neutral-50 py-10">
        <DotsMove size={40} duration={duration} />
        <div className="flex w-48 flex-col items-center gap-2">
          <input
            type="range"
            min={5}
            max={100}
            value={Math.round((1 - (duration - 0.1) / 0.9) * 95 + 5)}
            onChange={(e) => {
              const v = Number(e.target.value);
              const mapped = 0.1 + ((95 - (v - 5)) / 95) * 0.9;
              setDuration(Math.round(mapped * 100) / 100);
            }}
            className="h-[5px] w-full appearance-none rounded-full bg-neutral-200 accent-blue-600"
          />
          <span className="font-mono text-xs text-[var(--muted)]">
            {duration}s / step
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Button loading states ─────────────────────────────────────────────────────

function ButtonLoadingDemo() {
  const [loading, setLoading] = useState<string | null>(null);

  const trigger = (id: string) => {
    setLoading(id);
    setTimeout(() => setLoading(null), 2500);
  };

  return (
    <div>
      <DemoLabel
        label="Button loading states"
        description="Click to swap the label for the spinner."
      />
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => trigger("next")}
          disabled={loading === "next"}
          className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {loading === "next" ? (
            <DotsMove size={18} color="white" />
          ) : (
            <>
              Continue
              <ArrowRight size={14} />
            </>
          )}
        </button>

        <button
          onClick={() => trigger("retry")}
          disabled={loading === "retry"}
          className="flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "retry" ? (
            <DotsMove size={18} color="#78716c" />
          ) : (
            <>
              <RotateCcw size={14} />
              Retry
            </>
          )}
        </button>

        <button
          onClick={() => trigger("process")}
          disabled={loading === "process"}
          className="flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "process" ? (
            <DotsMove size={18} color="#78716c" />
          ) : (
            <>
              <Loader size={14} />
              Process
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Toast / status bar ───────────────────────────────────────────────────────

function StatusBarDemo() {
  return (
    <div>
      <DemoLabel
        label="Status bar"
        description="Inline in a status row — conveyor motion pairs well with progress messaging."
      />
      <div className="flex flex-col gap-2">
        {[
          { label: "Syncing changes…",    color: "#6366f1" },
          { label: "Compiling assets…",   color: "#f59e0b" },
          { label: "Deploying to prod…",  color: "#10b981" },
        ].map(({ label, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-2.5"
          >
            <DotsMove size={16} color={color} />
            <span className="text-sm text-neutral-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inline in text ───────────────────────────────────────────────────────────

function InlineTextDemo() {
  return (
    <div>
      <DemoLabel
        label="Inline in text"
        description="Small enough to sit in a line of body copy without breaking rhythm."
      />
      <div className="space-y-4 text-sm text-neutral-700">
        <p className="flex items-center gap-1.5">
          Generating your report
          <DotsMove size={16} color="#6366f1" />
        </p>
        <p className="flex items-center gap-1.5">
          Uploading 3 files
          <DotsMove size={16} color="#f59e0b" />
        </p>
        <p className="flex items-center gap-1.5">
          Connecting to server
          <DotsMove size={16} color="#10b981" />
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DotsMoveExperiment() {
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
          3 dots move
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          A conveyor-belt loader — dots shift right, the trailing dot
          shrinks and reappears on the left. Built with pure SVG SMIL,
          no JavaScript or dependencies.
        </p>

        <section className="space-y-16">
          <SizesDemo />
          <ColorsDemo />
          <SpeedDemo />
          <DarkSurfaceDemo />
          <ComparisonDemo />
          <InteractiveDemo />
          <ButtonLoadingDemo />
          <StatusBarDemo />
          <InlineTextDemo />
        </section>
      </main>
    </div>
  );
}
