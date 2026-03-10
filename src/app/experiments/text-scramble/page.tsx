"use client";

import Link from "next/link";
import { useState } from "react";
import { TextScramble } from "@/components/ui/text-scramble";

function BasicDemo() {
  return (
    <div className="flex justify-center">
      <TextScramble className="font-mono text-sm uppercase">
        Text Scramble
      </TextScramble>
    </div>
  );
}

function CustomTriggerDemo() {
  const [isTrigger, setIsTrigger] = useState(false);

  return (
    <div className="flex justify-center">
      <TextScramble
        className="text-sm text-foreground cursor-default"
        as="span"
        speed={0.01}
        trigger={isTrigger}
        onHoverStart={() => setIsTrigger(true)}
        onScrambleComplete={() => setIsTrigger(false)}
      >
        Tyler, The Creator - I Hope You Find Your Way Home
      </TextScramble>
    </div>
  );
}

function CustomCharacterDemo() {
  return (
    <div className="flex justify-center">
      <TextScramble
        className="font-mono text-sm"
        duration={1.2}
        characterSet=". "
      >
        Generating the interface...
      </TextScramble>
    </div>
  );
}

export default function TextScrambleExperiment() {
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
          Text scramble
        </h1>
        <p className="text-[var(--muted)] mb-12">
          Text that scrambles from random characters into the final string. Built with Framer Motion.
        </p>

        <section className="space-y-16">
          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
              Basic
            </h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              Basic text scramble with default settings.
            </p>
            <BasicDemo />
          </div>

          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
              Custom trigger
            </h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              Scramble triggered on hover.
            </p>
            <CustomTriggerDemo />
          </div>

          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
              Custom character set
            </h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              Custom character set (. and space) and duration.
            </p>
            <CustomCharacterDemo />
          </div>
        </section>
      </main>
    </div>
  );
}
