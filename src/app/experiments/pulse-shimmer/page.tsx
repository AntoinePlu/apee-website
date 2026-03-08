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

function msToSpeed(ms: number, min: number, max: number): number {
  return Math.round(((max - ms) / (max - min)) * 100);
}

export default function PulseShimmerExperiment() {
  const [pulseSpeed, setPulseSpeed] = useState(() =>
    msToSpeed(1400, MIN_PULSE_MS, MAX_PULSE_MS)
  );
  const [shimmerSpeed, setShimmerSpeed] = useState(() =>
    msToSpeed(2000, MIN_SHIMMER_MS, MAX_SHIMMER_MS)
  );

  const pulseDurationMs = speedToMs(pulseSpeed, MIN_PULSE_MS, MAX_PULSE_MS);
  const shimmerDurationMs = speedToMs(shimmerSpeed, MIN_SHIMMER_MS, MAX_SHIMMER_MS);

  return (
    <div
      className={`${inter.className} relative flex h-screen flex-col items-center bg-white text-neutral-800 antialiased`}
      style={{ fontSize: 14, lineHeight: 20, fontWeight: 600 }}
    >
      <Link
        href="/experiments"
        className="absolute left-6 top-6 z-10 flex h-5 items-center text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Back to experiments
      </Link>

      <main className="flex min-h-0 w-full max-w-2xl flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12 sm:py-16">
        <section className="flex flex-col items-center gap-12">
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
              <div className="relative size-6 flex-shrink-0 overflow-visible">
                <span
                  className="pulse-ring absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: PULSE_BLUE }}
                />
                <div
                  className="absolute left-1/2 top-1/2 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: PULSE_BLUE }}
                />
              </div>
              <span className="shimmer-text flex h-6 flex-col items-center justify-center tracking-tight">
                Update readme in main repo
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex w-full max-w-2xl flex-col gap-2 p-6">
            <div className="flex h-6 items-center gap-3">
              <label
                htmlFor="pulse-speed"
                className="flex h-6 w-16 shrink-0 items-center text-neutral-800 leading-none"
              >
                Pulse
              </label>
              <input
                id="pulse-speed"
                type="range"
                min={0}
                max={100}
                value={pulseSpeed}
                onChange={(e) => setPulseSpeed(Number(e.target.value))}
                className="range-knob-9 h-[5px] min-h-0 flex-1 appearance-none rounded-full bg-neutral-200 accent-blue-600"
              />
              <span className="flex h-6 w-14 shrink-0 items-center justify-end text-neutral-500 leading-none">
                {(pulseDurationMs / 1000).toFixed(1)}s
              </span>
            </div>

            <div className="flex h-6 items-center gap-3">
              <label
                htmlFor="shimmer-speed"
                className="flex h-6 w-16 shrink-0 items-center text-neutral-800 leading-none"
              >
                Shimmer
              </label>
              <input
                id="shimmer-speed"
                type="range"
                min={0}
                max={100}
                value={shimmerSpeed}
                onChange={(e) => setShimmerSpeed(Number(e.target.value))}
                className="range-knob-9 h-[5px] min-h-0 flex-1 appearance-none rounded-full bg-neutral-200 accent-blue-600"
              />
              <span className="flex h-6 w-14 shrink-0 items-center justify-end text-neutral-500 leading-none">
                {(shimmerDurationMs / 1000).toFixed(1)}s
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
