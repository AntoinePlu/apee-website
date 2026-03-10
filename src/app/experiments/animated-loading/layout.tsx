import { EXPERIMENTS } from "../experiments.config";

const slug = "animated-loading";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function AnimatedLoadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
