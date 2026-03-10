import { EXPERIMENTS } from "../experiments.config";

const slug = "voice-input";
const experiment = EXPERIMENTS.find((e) => e.slug === slug);

export const metadata = {
  title: experiment?.title ?? slug,
};

export default function VoiceInputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
