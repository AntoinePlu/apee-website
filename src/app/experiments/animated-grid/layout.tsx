import { EXPERIMENTS } from "../experiments.config";

const slug = "animated-grid";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function AnimatedGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
