import { EXPERIMENTS } from "../experiments.config";

const slug = "ai-input";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function AiInputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
