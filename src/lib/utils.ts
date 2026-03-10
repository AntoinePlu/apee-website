/**
 * Merges class names. Falsy values are omitted.
 * Used by shadcn-style components (e.g. TextShimmer).
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
