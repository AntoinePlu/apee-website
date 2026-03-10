import { EXPERIMENTS } from "../experiments.config";

const slug = "status-badge";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function StatusBadgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
