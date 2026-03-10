import { EXPERIMENTS } from "../experiments.config";

const slug = "agent-loader";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function AgentLoaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
