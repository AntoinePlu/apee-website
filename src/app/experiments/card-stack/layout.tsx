import { EXPERIMENTS } from "../experiments.config";

const slug = "card-stack";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function CardStackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
