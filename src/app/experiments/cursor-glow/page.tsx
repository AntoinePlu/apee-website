"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

function Nav() {
  return (
    <nav className="flex justify-between text-sm text-[var(--muted)]">
      <Link href="/" className="font-medium text-foreground hover:text-foreground">
        apee
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
        <Link href="/track-records" className="hover:text-foreground transition-colors">
          Track records
        </Link>
        <Link href="/stack" className="hover:text-foreground transition-colors">
          Stack
        </Link>
        <Link href="/experiments" className="hover:text-foreground transition-colors">
          Experiments
        </Link>
      </div>
    </nav>
  );
}

export default function CursorGlowExperiment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <header className="mb-16">
          <Nav />
        </header>

        <Link
          href="/experiments"
          className="mb-8 inline-block text-sm font-medium text-[var(--muted)] hover:text-foreground transition-colors"
        >
          ← Back to experiments
        </Link>

        <section className="space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Cursor glow
          </h1>
          <p className="text-[var(--muted)]">
            Move your cursor over the area below to see a soft glow follow the pointer.
          </p>

          <div
            ref={containerRef}
            className="relative h-64 w-full overflow-hidden rounded-xl border border-[var(--muted)]/30 bg-[var(--muted)]/5"
          >
            <div
              className="pointer-events-none absolute size-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl transition-[left,top] duration-150 ease-out"
              style={{
                left: position.x,
                top: position.y,
                background: "var(--accent)",
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
