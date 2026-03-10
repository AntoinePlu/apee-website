"use client";

import Link from "next/link";
import { AvatarCircles } from "@/components/ui/avatar-circles";

const avatarUrls = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
];

export default function AvatarCirclesExperiment() {
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
          Avatar circles
        </h1>
        <p className="text-[var(--muted)] mb-12">
          Overlapping avatar stack with a count badge — a compact way to show
          who&apos;s involved in a thread, project, or event.
        </p>

        <section className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-20 gap-10">
          <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
          <AvatarCircles numPeople={12} avatarUrls={avatarUrls.slice(0, 2)} />
        </section>
      </main>
    </div>
  );
}
