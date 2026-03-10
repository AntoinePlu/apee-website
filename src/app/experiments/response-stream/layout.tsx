import { EXPERIMENTS } from "../experiments.config";

const slug = "response-stream";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function ResponseStreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
