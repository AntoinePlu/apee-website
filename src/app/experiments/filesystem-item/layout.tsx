import { EXPERIMENTS } from "../experiments.config";

const slug = "filesystem-item";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function FilesystemItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
