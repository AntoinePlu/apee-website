"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotsMoveProps {
  size?: number;
  color?: string;
  duration?: number; // seconds per step (default 0.5s → 2s total cycle)
  className?: string;
}

export function DotsMove({
  size = 24,
  color = "hsl(228, 97%, 42%)",
  duration = 0.5,
  className,
}: DotsMoveProps) {
  const rawUid = useId();
  const uid = `dm${rawUid.replace(/[^a-zA-Z0-9]/g, "")}`;

  const totalDuration = duration * 4;
  const easing = "cubic-bezier(.36,.6,.31,1)";

  // One full cycle for a dot starting at the "appear" phase:
  //   0→25%  : grow at x=4  (r: 0 → 3)
  //   25→50% : move x=4  → x=12  (r stays 3)
  //   50→75% : move x=12 → x=20  (r stays 3)
  //   75→100%: shrink at x=20  (r: 3 → 0)
  //   100%→0%: instantaneous jump x=20 → x=4, r stays 0 (the "teleport")
  //            then the next iteration begins the grow phase again.
  const keyframes = `
    @keyframes ${uid} {
      0%   { cx: 4px;  r: 0px; animation-timing-function: ${easing}; }
      25%  { cx: 4px;  r: 3px; animation-timing-function: ${easing}; }
      50%  { cx: 12px; r: 3px; animation-timing-function: ${easing}; }
      75%  { cx: 20px; r: 3px; animation-timing-function: ${easing}; }
      100% { cx: 20px; r: 0px; }
    }
  `;

  // 4 dots, each offset by one step so they always form a conveyor.
  // Negative delay = "already N steps into the cycle at t=0."
  const dots = [
    { cx: 4,  r: 0, delay: 0              }, // appearing at x=4
    { cx: 4,  r: 3, delay: -duration      }, // moving  x=4  → x=12
    { cx: 12, r: 3, delay: -duration * 2  }, // moving  x=12 → x=20
    { cx: 20, r: 3, delay: -duration * 3  }, // shrinking at x=20
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
      {dots.map(({ cx, r, delay }, i) => (
        <circle
          key={i}
          cx={cx}
          cy="12"
          r={r}
          style={{
            animationName: uid,
            animationDuration: `${totalDuration}s`,
            animationDelay: `${delay}s`,
            animationTimingFunction: easing,
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        />
      ))}
    </svg>
  );
}
