import { EXPERIMENTS } from "../experiments.config";

const slug = "cursor-glow";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function CursorGlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
