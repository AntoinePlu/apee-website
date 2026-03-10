import { EXPERIMENTS } from "../experiments.config";

const slug = "bg-pattern";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function BGPatternLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
