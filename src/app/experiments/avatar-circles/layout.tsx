import { EXPERIMENTS } from "../experiments.config";

const slug = "avatar-circles";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function AvatarCirclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
