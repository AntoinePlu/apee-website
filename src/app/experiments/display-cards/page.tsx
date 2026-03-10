"use client";

import Link from "next/link";
import DisplayCards from "@/components/ui/display-cards";
import {
  Sparkles,
  Zap,
  Star,
  BookOpen,
  Flame,
  Bell,
  TrendingUp,
  Lock,
} from "lucide-react";

function DemoLabel({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="mb-6">
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
        description="Three stacked cards offset diagonally. Hover each to lift it forward and restore colour."
      />
      <div className="flex min-h-64 w-full items-center justify-center overflow-hidden py-8">
        <DisplayCards />
      </div>
    </div>
  );
}

function NotificationsDemo() {
  const cards = [
    {
      icon: <Bell className="size-4 text-violet-300" />,
      title: "Alerts",
      description: "3 new notifications",
      date: "Just now",
      iconClassName: "text-violet-500",
      titleClassName: "text-violet-400",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <TrendingUp className="size-4 text-violet-300" />,
      title: "Analytics",
      description: "Up 24% this week",
      date: "Today",
      iconClassName: "text-violet-500",
      titleClassName: "text-violet-400",
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Lock className="size-4 text-violet-300" />,
      title: "Security",
      description: "All systems secure",
      date: "2 hrs ago",
      iconClassName: "text-violet-500",
      titleClassName: "text-violet-400",
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <div>
      <DemoLabel
        label="Notification stack"
        description="Custom icons, violet accent — models a notification tray or inbox preview."
      />
      <div className="flex min-h-64 w-full items-center justify-center overflow-hidden py-8">
        <DisplayCards cards={cards} />
      </div>
    </div>
  );
}

function ContentFeedDemo() {
  const cards = [
    {
      icon: <Flame className="size-4 text-orange-300" />,
      title: "Trending",
      description: "How to build a design system",
      date: "1 hour ago",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-400",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Star className="size-4 text-orange-300" />,
      title: "Top pick",
      description: "Principles of great UI motion",
      date: "Yesterday",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-400",
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <BookOpen className="size-4 text-orange-300" />,
      title: "Reading list",
      description: "Tokens, variables, and themes",
      date: "3 days ago",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-400",
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <div>
      <DemoLabel
        label="Content feed"
        description="Orange accent, editorial titles — works as a reading list or article feed preview."
      />
      <div className="flex min-h-64 w-full items-center justify-center overflow-hidden py-8">
        <DisplayCards cards={cards} />
      </div>
    </div>
  );
}

function ProductDemo() {
  const cards = [
    {
      icon: <Zap className="size-4 text-emerald-300" />,
      title: "Starter",
      description: "Perfect for side projects",
      date: "Free forever",
      iconClassName: "text-emerald-600",
      titleClassName: "text-emerald-500",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-emerald-300" />,
      title: "Pro",
      description: "Everything you need to scale",
      date: "$19 / month",
      iconClassName: "text-emerald-600",
      titleClassName: "text-emerald-500",
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Star className="size-4 text-emerald-300" />,
      title: "Enterprise",
      description: "Custom contracts & SLAs",
      date: "Contact us",
      iconClassName: "text-emerald-600",
      titleClassName: "text-emerald-500",
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <div>
      <DemoLabel
        label="Pricing tiers"
        description="Green accent, plan names as titles — a playful alternative to a standard pricing table."
      />
      <div className="flex min-h-64 w-full items-center justify-center overflow-hidden py-8">
        <DisplayCards cards={cards} />
      </div>
    </div>
  );
}

export default function DisplayCardsExperiment() {
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
          Display cards
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          Stacked, skewed cards that fan out on hover — a dramatic way to
          surface grouped content like notifications, articles, or pricing tiers.
        </p>

        <section className="space-y-16">
          <DefaultDemo />
          <NotificationsDemo />
          <ContentFeedDemo />
          <ProductDemo />
        </section>
      </main>
    </div>
  );
}
