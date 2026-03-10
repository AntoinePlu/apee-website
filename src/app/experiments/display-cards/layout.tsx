import { EXPERIMENTS } from "../experiments.config";

const slug = "display-cards";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function DisplayCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
