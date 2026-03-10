import { EXPERIMENTS } from "../experiments.config";

const slug = "inline-dropdown";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function InlineDropdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
