"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { ResponseStream } from "@/components/ui/response-stream";
import type { Mode } from "@/components/ui/response-stream";
import { RotateCcw } from "lucide-react";

const TYPEWRITER_TEXT =
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet, making it a classic pangram used by typographers and developers alike to preview fonts and test character rendering across different systems and environments.";

const FADE_TEXT =
  "This text is fading in word by word. The fade mode creates a smooth and elegant reveal — each word appears with a gentle opacity transition, giving responses a calm, unhurried feel that suits AI-generated content.";

type Demo = {
  id: string;
  label: string;
  mode: Mode;
  text: string;
  speed?: number;
  fadeDuration?: number;
  segmentDelay?: number;
  description: string;
};

const DEMOS: Demo[] = [
  {
    id: "typewriter-default",
    label: "Typewriter — default speed",
    mode: "typewriter",
    text: TYPEWRITER_TEXT,
    speed: 20,
    description: "Characters stream in at the default pace.",
  },
  {
    id: "typewriter-fast",
    label: "Typewriter — fast",
    mode: "typewriter",
    text: TYPEWRITER_TEXT,
    speed: 80,
    description: "Higher speed, larger character chunks per frame.",
  },
  {
    id: "fade-default",
    label: "Fade — default speed",
    mode: "fade",
    text: FADE_TEXT,
    speed: 20,
    description: "Words fade in sequentially.",
  },
  {
    id: "fade-slow",
    label: "Fade — slow, long duration",
    mode: "fade",
    text: FADE_TEXT,
    fadeDuration: 1200,
    segmentDelay: 80,
    description: "Custom fadeDuration and segmentDelay for a cinematic reveal.",
  },
];

function DemoCard({ demo }: { demo: Demo }) {
  const [key, setKey] = useState(0);

  const replay = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {demo.label}
          </p>
          <p className="mt-0.5 text-sm text-neutral-500">{demo.description}</p>
        </div>
        <button
          onClick={replay}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-800"
          aria-label="Replay"
        >
          <RotateCcw size={12} />
          Replay
        </button>
      </div>

      <ResponseStream
        key={key}
        textStream={demo.text}
        mode={demo.mode}
        speed={demo.speed}
        fadeDuration={demo.fadeDuration}
        segmentDelay={demo.segmentDelay}
        className="min-h-[80px] text-sm leading-relaxed text-neutral-800"
      />
    </div>
  );
}

export default function ResponseStreamExperiment() {
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
          Response stream
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          Animated text streaming in typewriter or word-fade mode, with speed
          controls and a replay button.
        </p>

        <section className="space-y-6">
          {DEMOS.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </section>
      </main>
    </div>
  );
}
