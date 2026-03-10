import { EXPERIMENTS } from "../experiments.config";

const slug = "dots-bounce";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function DotsBounceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
