"use client";

import Link from "next/link";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "600" });

const PULSE_BLUE = "#0083F5";

const MIN_PULSE_MS = 400;
const MAX_PULSE_MS = 3000;
const MIN_SHIMMER_MS = 800;
const MAX_SHIMMER_MS = 4000;

function speedToMs(speed: number, min: number, max: number): number {
  return Math.round(max - (speed / 100) * (max - min));
}

export default function PulseShimmerExperiment() {
  const [pulseSpeed, setPulseSpeed] = useState(50);
  const [shimmerSpeed, setShimmerSpeed] = useState(50);

  const pulseDurationMs = speedToMs(pulseSpeed, MIN_PULSE_MS, MAX_PULSE_MS);
  const shimmerDurationMs = speedToMs(shimmerSpeed, MIN_SHIMMER_MS, MAX_SHIMMER_MS);

  return (
    <div
      className={`${inter.className} flex min-h-screen flex-col items-center justify-center bg-white text-neutral-800 antialiased`}
      style={{ fontSize: 14, lineHeight: 20, fontWeight: 600 }}
    >
      <main className="flex h-full w-full max-w-2xl flex-col items-center justify-center px-6 py-12 sm:py-16">
        <Link
          href="/experiments"
          className="mb-12 flex h-5 flex-col items-start justify-center text-neutral-500 transition-colors hover:text-neutral-900"
        >
          ← Back to experiments
        </Link>

        <section className="flex h-full flex-col items-center gap-12">
          {/* Pulse icon + shimmer text — same design as v0 */}
          <div
            className="flex min-h-[200px] flex-col items-center justify-center gap-6"
            style={
              {
                "--pulse-duration": `${pulseDurationMs}ms`,
                "--shimmer-duration": `${shimmerDurationMs}ms`,
              } as React.CSSProperties
            }
          >
            <div className="flex flex-shrink-0 items-center gap-1">
              <div className="relative size-8 flex-shrink-0 overflow-visible">
                <span
                  className="pulse-ring absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: PULSE_BLUE }}
                />
                <div
                  className="absolute left-1/2 top-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: PULSE_BLUE }}
                />
              </div>
              <span className="shimmer-text flex h-6 flex-col items-center justify-center tracking-tight">
                Update readme in main repo
              </span>
            </div>
          </div>

          {/* Speed controls */}
          <div className="flex w-full max-w-2xl flex-wrap items-end gap-x-12 gap-y-6 p-6">
            <div className="flex min-w-[200px] flex-1 flex-col space-y-2">
              <div className="flex h-full justify-between">
                <label
                  htmlFor="pulse-speed"
                  className="flex h-6 items-center justify-start text-neutral-800"
                >
                  Pulse speed
                </label>
                <span className="flex h-6 items-center justify-start text-neutral-500">
                  {(pulseDurationMs / 1000).toFixed(1)}s period
                </span>
              </div>
              <input
                id="pulse-speed"
                type="range"
                min={0}
                max={100}
                value={pulseSpeed}
                onChange={(e) => setPulseSpeed(Number(e.target.value))}
                className="h-[5px] w-full appearance-none rounded-full bg-neutral-200 accent-blue-600"
              />
            </div>

            <div className="flex min-w-[200px] flex-1 flex-col space-y-2">
              <div className="flex h-full justify-between">
                <label
                  htmlFor="shimmer-speed"
                  className="flex h-6 items-center justify-start text-neutral-800"
                >
                  Shimmer speed
                </label>
                <span className="flex h-6 items-center justify-start text-neutral-500">
                  {(shimmerDurationMs / 1000).toFixed(1)}s cycle
                </span>
              </div>
              <input
                id="shimmer-speed"
                type="range"
                min={0}
                max={100}
                value={shimmerSpeed}
                onChange={(e) => setShimmerSpeed(Number(e.target.value))}
                className="h-[5px] w-full appearance-none rounded-full bg-neutral-200 accent-blue-600"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
