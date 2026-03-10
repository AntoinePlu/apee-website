import Link from "next/link";
import { DM_Sans, Inter } from "next/font/google";
import { EXPERIMENTS } from "./experiments.config";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["700"], variable: "--font-dm-sans" });
const inter = Inter({ subsets: ["latin"], weight: ["100", "400", "500"], variable: "--font-inter" });

const TRACK_RECORDS_BG = "#162625";
const SECTION_TITLE = "#c3d1bc";
const PAGE_TITLE = "#dfe6db";
const TEXT_MUTED = "#91ac86";

const FIGMA_LOGO = "https://www.figma.com/api/mcp/asset/1af2bbce-1077-4a47-bfbb-22d51caf4a8d";

const headingClass = "font-bold leading-normal tracking-normal";

export default function ExperimentsGallery() {
  return (
    <div
      className={`${inter.variable} ${dmSans.variable} min-h-screen antialiased`}
      style={{
        background: TRACK_RECORDS_BG,
        color: TEXT_MUTED,
        fontFamily: "'GT America', var(--font-inter), sans-serif",
      }}
    >
      <main className="mx-auto w-full max-w-[960px] px-6 py-16 sm:py-24">
        <header className="mb-16 flex flex-col gap-6">
          <Link href="/" className="shrink-0 self-start">
            <img
              src={FIGMA_LOGO}
              alt="Apee"
              width={80}
              height={80}
              className="block size-20 rounded-sm object-cover"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <h1
              className={`${dmSans.className} text-[32px] ${headingClass}`}
              style={{ color: PAGE_TITLE }}
            >
              Experiments
            </h1>
            <p className="max-w-[560px] font-extralight text-xl leading-normal" style={{ color: TEXT_MUTED }}>
              Design and interaction experiments—playground for motion, layout, and UI ideas.
            </p>
          </div>
        </header>

        <section className="w-full">
          <h2
            className={`${dmSans.className} text-2xl ${headingClass} mb-3`}
            style={{ color: SECTION_TITLE }}
          >
            All experiments
          </h2>
          <div
            className="mb-4 h-px w-full block"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, ${TEXT_MUTED} 0px, ${TEXT_MUTED} 1px, transparent 1px, transparent 5px)`,
            }}
          />
          <div className="flex flex-col gap-2">
            {EXPERIMENTS.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiments/${exp.slug}`}
                className="group flex items-center gap-2 w-full"
              >
                <span className="text-xl font-medium leading-normal shrink-0" style={{ color: PAGE_TITLE }}>
                  {exp.title}
                </span>
                <span
                  className="min-w-0 flex-1 self-end mb-1.5 h-px block shrink-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(to right, ${TEXT_MUTED} 0px, ${TEXT_MUTED} 1px, transparent 1px, transparent 5px)`,
                  }}
                />
                <span
                  className="shrink-0 max-w-0 overflow-hidden opacity-0 group-hover:max-w-[4rem] group-hover:opacity-100 transition-all duration-200 font-extralight text-xl leading-normal whitespace-nowrap"
                  style={{ color: TEXT_MUTED }}
                >
                  Open
                </span>
              </Link>
            ))}
          </div>

          {EXPERIMENTS.length === 0 && (
            <p className="font-extralight text-xl" style={{ color: TEXT_MUTED }}>
              No experiments yet. Add entries to experiments.config.ts and create a page under experiments/[slug]/page.tsx.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
