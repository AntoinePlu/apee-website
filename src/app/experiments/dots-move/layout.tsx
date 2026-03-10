import { EXPERIMENTS } from "../experiments.config";

const slug = "dots-move";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function DotsMoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
