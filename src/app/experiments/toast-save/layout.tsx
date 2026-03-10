import { EXPERIMENTS } from "../experiments.config";

const slug = "toast-save";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function ToastSaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
