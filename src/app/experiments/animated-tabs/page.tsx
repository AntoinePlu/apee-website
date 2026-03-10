"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

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

const newsTabs = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y." },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
];

const viewTabs = [
  { id: "grid", label: "Grid" },
  { id: "list", label: "List" },
  { id: "table", label: "Table" },
];

const timeTabs = [
  { id: "1d", label: "1D" },
  { id: "7d", label: "7D" },
  { id: "1m", label: "1M" },
  { id: "3m", label: "3M" },
  { id: "1y", label: "1Y" },
  { id: "all", label: "All" },
];

const settingsTabs = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "notifications", label: "Notifications" },
];

const contentMap: Record<string, { heading: string; body: string }> = {
  world: {
    heading: "World news",
    body: "Coverage of global politics, conflicts, diplomacy, and international affairs.",
  },
  ny: {
    heading: "New York",
    body: "Local coverage of New York City — politics, culture, and community stories.",
  },
  business: {
    heading: "Business",
    body: "Markets, economics, corporate news, and the forces shaping commerce.",
  },
  arts: {
    heading: "Arts",
    body: "Reviews, profiles, and criticism from the worlds of film, music, and visual art.",
  },
  science: {
    heading: "Science",
    body: "Discoveries in biology, physics, climate science, and technology.",
  },
};

function WithContentDemo() {
  const [activeTab, setActiveTab] = useState("world");
  const content = contentMap[activeTab];

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-background">
      <div className="border-b border-neutral-200 px-4 py-3">
        <AnimatedTabs tabs={newsTabs} onChange={setActiveTab} />
      </div>
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-foreground">{content.heading}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{content.body}</p>
      </div>
    </div>
  );
}

export default function AnimatedTabsExperiment() {
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
          Animated tabs
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          A tab bar with a spring-animated highlight bubble that slides between
          tabs using Framer Motion's layout animation and{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-xs text-neutral-700">
            mix-blend-difference
          </code>{" "}
          to invert the label colour.
        </p>

        <section className="space-y-14">
          <div>
            <DemoLabel
              label="Default"
              description="Five tabs — the bubble slides with a spring bounce."
            />
            <AnimatedTabs tabs={newsTabs} />
          </div>

          <div>
            <DemoLabel
              label="With content panel"
              description="Tab selection drives content below — a typical navigation pattern."
            />
            <WithContentDemo />
          </div>

          <div>
            <DemoLabel
              label="View switcher"
              description="Three options — works as a compact segmented control."
            />
            <AnimatedTabs tabs={viewTabs} defaultTab="list" />
          </div>

          <div>
            <DemoLabel
              label="Time range"
              description="Six compact labels — common in charts and dashboards."
            />
            <AnimatedTabs tabs={timeTabs} defaultTab="1m" />
          </div>

          <div>
            <DemoLabel
              label="Settings nav"
              description="Four sections — longer labels still slide smoothly."
            />
            <AnimatedTabs tabs={settingsTabs} defaultTab="general" />
          </div>

          <div>
            <DemoLabel
              label="On a tinted surface"
              description="The mix-blend-difference effect adapts to any background colour."
            />
            <div className="flex flex-col gap-4">
              {[
                "bg-neutral-900",
                "bg-blue-600",
                "bg-amber-100",
              ].map((bg) => (
                <div
                  key={bg}
                  className={`flex items-center rounded-xl px-4 py-4 ${bg}`}
                >
                  <AnimatedTabs tabs={viewTabs} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
