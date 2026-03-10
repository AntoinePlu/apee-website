"use client";

import Link from "next/link";
import { useState } from "react";
import { DotsBounce } from "@/components/ui/dots-bounce";
import { RefreshCw, Send, Upload, Cpu } from "lucide-react";

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
        description="Scale the SVG freely — the animation stays proportional."
      />
      <div className="flex flex-wrap items-end gap-6">
        {sizes.map(({ label, size }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <DotsBounce size={size} />
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
        description="Pass any CSS color string to the color prop."
      />
      <div className="flex flex-wrap items-end gap-6">
        {colors.map(({ label, color }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <DotsBounce size={24} color={color} />
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
    { label: "Slow",    duration: 1.2 },
    { label: "Default", duration: 0.6 },
    { label: "Fast",    duration: 0.35 },
    { label: "Snappy",  duration: 0.2 },
  ];

  return (
    <div>
      <DemoLabel
        label="Speed"
        description="duration controls the bounce cycle length in seconds."
      />
      <div className="flex flex-wrap items-end gap-10">
        {speeds.map(({ label, duration }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <DotsBounce size={28} duration={duration} />
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
    { color: "#ffffff",    label: "White" },
    { color: "#93c5fd",    label: "Blue 300" },
    { color: "#a5b4fc",    label: "Indigo 300" },
    { color: "#6ee7b7",    label: "Emerald 300" },
  ];

  return (
    <div>
      <DemoLabel
        label="On dark"
        description="Light dot colors on a dark card surface."
      />
      <div className="flex flex-wrap items-end gap-8 rounded-xl bg-neutral-950 px-8 py-8">
        {variants.map(({ color, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <DotsBounce size={28} color={color} />
            <span className="font-mono text-[10px] text-neutral-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Interactive speed control ─────────────────────────────────────────────────

function InteractiveDemo() {
  const [duration, setDuration] = useState(0.6);

  return (
    <div>
      <DemoLabel
        label="Interactive"
        description="Drag the slider to control bounce speed in real time."
      />
      <div className="flex flex-col items-center gap-6 rounded-xl border border-neutral-200 bg-neutral-50 py-10">
        <DotsBounce size={40} duration={duration} />
        <div className="flex w-48 flex-col items-center gap-2">
          <input
            type="range"
            min={10}
            max={200}
            value={Math.round((1 - (duration - 0.1) / 1.9) * 190 + 10)}
            onChange={(e) => {
              const v = Number(e.target.value);
              const mapped = 0.1 + ((190 - (v - 10)) / 190) * 1.9;
              setDuration(Math.round(mapped * 100) / 100);
            }}
            className="h-[5px] w-full appearance-none rounded-full bg-neutral-200 accent-blue-600"
          />
          <span className="font-mono text-xs text-[var(--muted)]">
            {duration}s / bounce
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── In context ───────────────────────────────────────────────────────────────

function ButtonLoadingDemo() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setLoading(id);
    setTimeout(() => setLoading(null), 2500);
  };

  return (
    <div>
      <DemoLabel
        label="Button loading states"
        description="Click any button to see the spinner replace the label."
      />
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleClick("send")}
          disabled={loading === "send"}
          className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {loading === "send" ? (
            <DotsBounce size={18} color="white" />
          ) : (
            <>
              <Send size={14} />
              Send message
            </>
          )}
        </button>

        <button
          onClick={() => handleClick("upload")}
          disabled={loading === "upload"}
          className="flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "upload" ? (
            <DotsBounce size={18} color="#78716c" />
          ) : (
            <>
              <Upload size={14} />
              Upload file
            </>
          )}
        </button>

        <button
          onClick={() => handleClick("sync")}
          disabled={loading === "sync"}
          className="flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "sync" ? (
            <DotsBounce size={18} color="#78716c" />
          ) : (
            <>
              <RefreshCw size={14} />
              Sync
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function AIThinkingDemo() {
  return (
    <div>
      <DemoLabel
        label="AI thinking state"
        description="Inline in a chat bubble — replacing a typing indicator."
      />
      <div className="flex flex-col gap-3">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-xs rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2.5 text-sm text-white">
            What's the best way to animate SVGs in React?
          </div>
        </div>

        {/* AI thinking */}
        <div className="flex items-end gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100">
            <Cpu size={14} className="text-neutral-500" />
          </div>
          <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-neutral-200 bg-white px-4 py-3">
            <DotsBounce size={20} color="#a3a3a3" duration={0.6} />
          </div>
        </div>

        {/* Settled AI reply */}
        <div className="flex items-end gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100">
            <Cpu size={14} className="text-neutral-500" />
          </div>
          <div className="max-w-sm rounded-2xl rounded-tl-sm border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-800">
            Use SMIL for simple declarative animations, or Framer Motion for
            spring physics and orchestration.
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingCardDemo() {
  const items = [
    { label: "Fetching schema",  done: true  },
    { label: "Running queries",  done: true  },
    { label: "Formatting output", done: false },
  ];

  return (
    <div>
      <DemoLabel
        label="Progress list"
        description="Inline indicator on the active step in a multi-step process."
      />
      <div className="w-full max-w-xs rounded-xl border border-neutral-200 bg-white p-5">
        <p className="mb-4 text-sm font-semibold text-neutral-800">
          Generating report
        </p>
        <ul className="space-y-3">
          {items.map(({ label, done }) => (
            <li key={label} className="flex items-center gap-3 text-sm">
              {done ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold">
                  ✓
                </span>
              ) : (
                <DotsBounce size={16} color="#6366f1" />
              )}
              <span className={done ? "text-neutral-400 line-through" : "text-neutral-800"}>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DotsBounceExperiment() {
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
          3 dots bounce
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          A three-dot bounce loader built with pure SVG SMIL animation — no
          JavaScript, no dependencies. Scales, recolors, and speeds up with
          simple props.
        </p>

        <section className="space-y-16">
          <SizesDemo />
          <ColorsDemo />
          <SpeedDemo />
          <DarkSurfaceDemo />
          <InteractiveDemo />
          <ButtonLoadingDemo />
          <AIThinkingDemo />
          <LoadingCardDemo />
        </section>
      </main>
    </div>
  );
}
