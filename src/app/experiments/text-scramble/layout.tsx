import { EXPERIMENTS } from "../experiments.config";

const slug = "text-scramble";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function TextScrambleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
