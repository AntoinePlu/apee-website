"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotsBounceProps {
  size?: number;
  color?: string;
  duration?: number; // seconds for one bounce (default 0.6s)
  className?: string;
}

export function DotsBounce({
  size = 24,
  color = "hsl(228, 97%, 42%)",
  duration = 0.6,
  className,
}: DotsBounceProps) {
  const rawUid = useId();
  const uid = `db${rawUid.replace(/[^a-zA-Z0-9]/g, "")}`;

  // Timing constants (matching the original SMIL animation)
  const offset = 0.1;  // seconds between each dot's bounce start
  const pause = 0.25;  // seconds of rest after all dots finish
  const period = duration + pause + 2 * offset; // full cycle length

  // Keyframe percentages: bounce occupies the first `duration/period` of each cycle
  const halfPct = ((duration / 2 / period) * 100).toFixed(3);
  const endPct = ((duration / period) * 100).toFixed(3);

  const keyframes = `
    @keyframes ${uid} {
      0%         { cy: 12px; animation-timing-function: cubic-bezier(.33,.66,.66,1); }
      ${halfPct}% { cy: 6px;  animation-timing-function: cubic-bezier(.33,0,.66,.33); }
      ${endPct}%  { cy: 12px; }
      100%        { cy: 12px; }
    }
  `;

  const dots = [
    { cx: 4,  delay: 0          },
    { cx: 12, delay: offset      },
    { cx: 20, delay: offset * 2  },
  ];

  return (
    <svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="Loading"
      role="img"
    >
      <style>{keyframes}</style>
      {dots.map(({ cx, delay }, i) => (
        <circle
          key={i}
          cx={cx}
          cy="12"
          r="3"
          style={{
            animationName: uid,
            animationDuration: `${period}s`,
            animationDelay: `${delay}s`,
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        />
      ))}
    </svg>
  );
}
