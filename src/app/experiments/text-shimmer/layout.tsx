import { EXPERIMENTS } from "../experiments.config";

const slug = "text-shimmer";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function TextShimmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
