export type Experiment = {
  slug: string;
  title: string;
  description: string;
};

export const EXPERIMENTS: Experiment[] = [
  {
    slug: "cursor-glow",
    title: "Cursor glow",
    description: "A subtle glow that follows the pointer.",
  },
  {
    slug: "pulse-shimmer",
    title: "Pulse icon + shimmer text",
    description: "Pulsing circle and text with a moving shimmer, plus speed controls.",
  },
];
