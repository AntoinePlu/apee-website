import { EXPERIMENTS } from "../experiments.config";

const slug = "flickering-grid";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function FlickeringGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
