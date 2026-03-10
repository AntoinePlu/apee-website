import { EXPERIMENTS } from "../experiments.config";

const slug = "animated-tabs";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function AnimatedTabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
