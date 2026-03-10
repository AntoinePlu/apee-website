import { EXPERIMENTS } from "../experiments.config";

const slug = "pulse-shimmer";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function PulseShimmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
