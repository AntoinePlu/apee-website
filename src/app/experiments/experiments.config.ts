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
  {
    slug: "agent-loader",
    title: "AI agent loader",
    description: "Multi-step loading animation for an AI agent with timeline scrubber and easing.",
  },
  {
    slug: "text-shimmer",
    title: "Text shimmer",
    description: "Animated text with a moving gradient shimmer. Built with Framer Motion.",
  },
  {
    slug: "text-scramble",
    title: "Text scramble",
    description: "Text that scrambles from random characters into the final string.",
  },
  {
    slug: "animated-loading",
    title: "Animated loading breadcrumb",
    description: "SVG path stroke animation with shimmer text — a minimal loading indicator for AI agent states.",
  },
  {
    slug: "toast-save",
    title: "Toast save",
    description: "Animated save toast with unsaved, loading, and success states. Built with Framer Motion.",
  },
  {
    slug: "ai-input",
    title: "AI input",
    description: "Morphing panel that springs open from a dock bar into a full textarea with a spinning color orb.",
  },
  {
    slug: "filesystem-item",
    title: "Filesystem tree",
    description: "Recursive file-system explorer with animated spring expand/collapse powered by Framer Motion.",
  },
  {
    slug: "response-stream",
    title: "Response stream",
    description: "Animated text streaming in typewriter or word-fade mode, with speed controls and a replay button.",
  },
  {
    slug: "spotlight",
    title: "Spotlight",
    description: "A spring-animated radial glow that follows the cursor inside its parent container.",
  },
  {
    slug: "flickering-grid",
    title: "Flickering grid",
    description: "A canvas-drawn grid of squares that randomly flicker their opacity — useful as ambient texture or hero backgrounds.",
  },
  {
    slug: "animated-grid",
    title: "Animated grid pattern",
    description: "An SVG grid where random squares animate in and out — works great as a hero or card background with a mask.",
  },
  {
    slug: "display-cards",
    title: "Display cards",
    description: "Stacked, skewed cards that fan out on hover — a dramatic way to surface grouped content.",
  },
  {
    slug: "card-stack",
    title: "Animated card stack",
    description: "A spring-animated deck of cards that cycles on button press — front card exits while a new one enters from behind.",
  },
  {
    slug: "bg-pattern",
    title: "Background pattern",
    description: "Six pure-CSS background patterns combined with eight gradient mask types — dots, grid, stripes, lines, and checkerboard.",
  },
  {
    slug: "status-badge",
    title: "Status badge",
    description: "A pill badge with a left label and right label separated by a divider — surfaces system state, feature flags, or audit info.",
  },
  {
    slug: "voice-input",
    title: "Voice input",
    description: "A pill-shaped button that expands into a live recording indicator — animated frequency bars and a running timer.",
  },
  {
    slug: "avatar-circles",
    title: "Avatar circles",
    description: "Overlapping avatar stack with a count badge — a compact way to show who's involved in a thread, project, or event.",
  },
  {
    slug: "inline-dropdown",
    title: "Inline dropdown",
    description: "A compact context menu with animated transitions — toggle favorites, rename inline, and hold to confirm destructive actions.",
  },
  {
    slug: "animated-tabs",
    title: "Animated tabs",
    description: "Tab bar with a spring-animated highlight bubble that slides between tabs using Framer Motion layout animation and mix-blend-difference.",
  },
  {
    slug: "dots-bounce",
    title: "3 dots bounce",
    description: "A three-dot bounce loader built with pure SVG SMIL animation — no JavaScript, no dependencies. Scalable and recolorable.",
  },
  {
    slug: "dots-move",
    title: "3 dots move",
    description: "A conveyor-belt loader — dots shift right, the trailing dot shrinks and reappears on the left. Pure SVG SMIL, no dependencies.",
  },
];
