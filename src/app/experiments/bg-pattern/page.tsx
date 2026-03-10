import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import type { BGVariantType, BGMaskType } from "@/components/ui/bg-pattern";

type Demo = {
  variant: BGVariantType;
  mask: BGMaskType;
  fill?: string;
  size?: number;
  label: string;
  maskLabel: string;
};

const DEMOS: Demo[] = [
  {
    variant: "grid",
    mask: "fade-edges",
    label: "Grid",
    maskLabel: "fade-edges",
  },
  {
    variant: "dots",
    mask: "fade-center",
    label: "Dots",
    maskLabel: "fade-center",
  },
  {
    variant: "diagonal-stripes",
    mask: "fade-y",
    label: "Diagonal stripes",
    maskLabel: "fade-y",
  },
  {
    variant: "horizontal-lines",
    mask: "fade-right",
    label: "Horizontal lines",
    maskLabel: "fade-right",
  },
  {
    variant: "vertical-lines",
    mask: "fade-bottom",
    label: "Vertical lines",
    maskLabel: "fade-bottom",
  },
  {
    variant: "checkerboard",
    mask: "fade-top",
    size: 16,
    label: "Checkerboard",
    maskLabel: "fade-top",
  },
];

const COLOUR_DEMOS: Demo[] = [
  {
    variant: "dots",
    mask: "fade-edges",
    fill: "#3b82f6",
    size: 20,
    label: "Blue dots",
    maskLabel: "fade-edges",
  },
  {
    variant: "grid",
    mask: "fade-y",
    fill: "#8b5cf6",
    label: "Violet grid",
    maskLabel: "fade-y",
  },
  {
    variant: "diagonal-stripes",
    mask: "fade-x",
    fill: "#f59e0b",
    size: 12,
    label: "Amber stripes",
    maskLabel: "fade-x",
  },
];

function PatternCard({ demo }: { demo: Demo }) {
  return (
    <div className="relative flex h-36 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-background">
      <BGPattern
        variant={demo.variant}
        mask={demo.mask}
        fill={demo.fill}
        size={demo.size}
      />
      <p className="relative z-10 text-sm font-semibold text-foreground">
        {demo.label}
      </p>
      <p className="relative z-10 mt-0.5 font-mono text-xs text-[var(--muted)]">
        mask: {demo.maskLabel}
      </p>
    </div>
  );
}

export default function BGPatternExperiment() {
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
          Background pattern
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          Six pure-CSS background patterns — dots, grid, stripes, lines,
          checkerboard — combined with eight gradient mask types.
        </p>

        <section className="space-y-12">
          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              All variants
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {DEMOS.map((demo) => (
                <PatternCard key={`${demo.variant}-${demo.mask}`} demo={demo} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Colour fills
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {COLOUR_DEMOS.map((demo) => (
                <PatternCard key={`${demo.variant}-${demo.fill}`} demo={demo} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              All mask types (grid variant)
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  "none",
                  "fade-edges",
                  "fade-center",
                  "fade-top",
                  "fade-bottom",
                  "fade-left",
                  "fade-right",
                  "fade-x",
                  "fade-y",
                ] as BGMaskType[]
              ).map((mask) => (
                <div
                  key={mask}
                  className="relative flex h-28 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-background"
                >
                  <BGPattern variant="grid" mask={mask} />
                  <p className="relative z-10 font-mono text-[10px] text-[var(--muted)]">
                    {mask}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Real-world usage
            </h2>
            <div className="space-y-3">
              <div className="relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-background">
                <BGPattern variant="dots" mask="fade-edges" fill="#a3a3a3" size={20} />
                <p className="relative z-10 text-2xl font-semibold tracking-tight">
                  Hero section
                </p>
                <p className="relative z-10 mt-1 text-sm text-[var(--muted)]">
                  Dot grid fading at the edges
                </p>
              </div>

              <div className="relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950">
                <BGPattern variant="grid" mask="fade-edges" fill="#404040" />
                <p className="relative z-10 text-2xl font-semibold tracking-tight text-white">
                  Dark card
                </p>
                <p className="relative z-10 mt-1 text-sm text-neutral-400">
                  Grid on a dark background
                </p>
              </div>

              <div className="relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-background">
                <BGPattern
                  variant="diagonal-stripes"
                  mask="fade-x"
                  fill="#e5e7eb"
                  size={10}
                />
                <p className="relative z-10 text-2xl font-semibold tracking-tight">
                  Subtle texture
                </p>
                <p className="relative z-10 mt-1 text-sm text-[var(--muted)]">
                  Fine diagonal stripes, fade-x mask
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
