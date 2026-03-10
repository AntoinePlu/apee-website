import { EXPERIMENTS } from "../experiments.config";

const slug = "spotlight";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function SpotlightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
