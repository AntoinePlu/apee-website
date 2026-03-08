"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { DM_Sans, Inter } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dm-sans",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "400", "500"],
  variable: "--font-inter",
});

const STACK_BG = "#162625";
const SECTION_TITLE = "#c3d1bc";
const PAGE_TITLE = "#dfe6db";
const TEXT_MUTED = "#91ac86";

const headingClass = "font-bold leading-normal tracking-normal";

const AVATAR_SQUARE =
  "https://www.figma.com/api/mcp/asset/7901ccf7-4346-4bad-b014-06d2d0a09160";
const ICON_CARET_DOWN = "/icons/Icon-caret-down.svg";

const STACK_ICONS = [
  "https://www.figma.com/api/mcp/asset/7a100ff7-b47a-4639-9e6f-3dc9ab50e922",
  "https://www.figma.com/api/mcp/asset/899d7e12-c6ff-409e-b9d2-f593de2f7b7c",
  "https://www.figma.com/api/mcp/asset/4014d778-cdc7-4f73-8367-699463b4875a",
  "https://www.figma.com/api/mcp/asset/d1baaa06-1baa-41ba-bf87-5c80a7cc82e1",
  "https://www.figma.com/api/mcp/asset/66a956d0-eba8-4a64-99f5-a76447991111",
  "https://www.figma.com/api/mcp/asset/ffeea61d-ac77-477f-8ae3-82d66ed67a54",
  "https://www.figma.com/api/mcp/asset/5cbbc8e9-845a-4b9e-b609-2170c62bff8d",
  "https://www.figma.com/api/mcp/asset/9fafd649-455d-42a5-b3a1-a855ba75789c",
  "https://www.figma.com/api/mcp/asset/634bb30f-95e2-452a-a230-39973ca44373",
  "https://www.figma.com/api/mcp/asset/6676ac5b-3e6f-427e-83da-4b2519dab68d",
  "https://www.figma.com/api/mcp/asset/a6488a17-e706-4688-9472-0f6c112e47c7",
  "https://www.figma.com/api/mcp/asset/c6ac85a3-a9a4-4a37-91ab-ec1163f296fd",
  "https://www.figma.com/api/mcp/asset/346cf64d-f8b1-47da-956d-cbccbbf7b4ef",
  "https://www.figma.com/api/mcp/asset/64ecccf6-21ce-4797-bf4e-14a7d7bb94ad",
  "https://www.figma.com/api/mcp/asset/7148ef5a-1181-4188-9d46-9985973704e1",
  "https://www.figma.com/api/mcp/asset/3582ad50-5b78-4f94-b090-ed1d2fca220f",
  "https://www.figma.com/api/mcp/asset/026d8efa-a0f1-4858-81ff-b0191d22c19c",
  "https://www.figma.com/api/mcp/asset/bf357f84-332e-4672-a636-d2df2b6aa54f",
  "https://www.figma.com/api/mcp/asset/910b279e-caa7-48a7-ac7d-30e38f3e1bac",
  "https://www.figma.com/api/mcp/asset/b387f112-0034-49ee-9cb2-be4c205fa3d4",
  "https://www.figma.com/api/mcp/asset/60e1cdd8-f44c-4ea5-96c0-d44f92ee3e08",
  "https://www.figma.com/api/mcp/asset/fe653821-8340-4732-a818-e42fd0d6a026",
  "https://www.figma.com/api/mcp/asset/7a1351c1-737a-4f7c-9b6c-3e0016cf8acd",
  "https://www.figma.com/api/mcp/asset/5fad2e1a-bdc4-46fc-8d63-e77722f2bed2",
];

const SERVICES: { name: string; platforms: string; iconIndex: number }[] = [
  { name: "1Password", platforms: "macOS, iOS. Web", iconIndex: 0 },
  { name: "AirPods Pro 3", platforms: "Physical", iconIndex: 1 },
  { name: "AirPods Max", platforms: "Physical", iconIndex: 1 },
  { name: "Alcove", platforms: "macOS", iconIndex: 2 },
  { name: "Amie", platforms: "macOS", iconIndex: 3 },
  { name: "Apple Watch Series 11", platforms: "Physical", iconIndex: 1 },
  { name: "Arc", platforms: "macOS", iconIndex: 4 },
  { name: "Claude", platforms: "macOS", iconIndex: 5 },
  { name: "CleanShot X", platforms: "macOS", iconIndex: 6 },
  { name: "Conductor", platforms: "macOS", iconIndex: 7 },
  { name: "Cursor", platforms: "macOS", iconIndex: 8 },
  { name: "Discord", platforms: "macOS, iOS", iconIndex: 9 },
  { name: "Figma", platforms: "macOS", iconIndex: 10 },
  { name: "Flighty", platforms: "macOS, iOS", iconIndex: 11 },
  { name: "Klack", platforms: "macOS", iconIndex: 12 },
  { name: "iPhone 17 Pro", platforms: "Physical", iconIndex: 1 },
  { name: "Loom", platforms: "macOS", iconIndex: 13 },
  { name: "Linear", platforms: "macOS", iconIndex: 14 },
  { name: "MacBook Pro M3", platforms: "Physical", iconIndex: 1 },
  { name: "MyMind", platforms: "macOS, iOS", iconIndex: 15 },
  { name: "Notion", platforms: "macOS, iOS", iconIndex: 16 },
  { name: "Notion Calendar", platforms: "macOS, iOS", iconIndex: 17 },
  { name: "Put.io", platforms: "Web, tvOS", iconIndex: 1 },
  { name: "Obvious", platforms: "Web, iOS", iconIndex: 1 },
  { name: "Opal", platforms: "Physical", iconIndex: 18 },
  { name: "Raycast", platforms: "macOS, Windows", iconIndex: 19 },
  { name: "SF Symbols", platforms: "macOS", iconIndex: 20 },
  { name: "Spotify", platforms: "macOS, iOS", iconIndex: 21 },
  { name: "Sonos", platforms: "iOS", iconIndex: 22 },
  { name: "Stark", platforms: "macOS", iconIndex: 23 },
  { name: "Steam", platforms: "Windows", iconIndex: 1 },
  { name: "Telegram", platforms: "macOS, iOS", iconIndex: 1 },
  { name: "Twitch", platforms: "Web, iOS", iconIndex: 1 },
  { name: "Trakt", platforms: "Web, iOS", iconIndex: 1 },
  { name: "VSCO", platforms: "Web, iOS", iconIndex: 1 },
];

const PLATFORM_OPTIONS = ["All platforms", "macOS", "iOS", "Web", "Physical", "Windows", "tvOS"];

export default function Stack() {
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("All platforms");
  const platformsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (platformsRef.current && !platformsRef.current.contains(target)) {
        setPlatformsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredServices =
    selectedPlatform === "All platforms"
      ? SERVICES
      : SERVICES.filter((s) =>
          s.platforms.toLowerCase().includes(selectedPlatform.toLowerCase())
        );

  return (
    <div
      className={`${inter.variable} ${dmSans.variable} min-h-screen antialiased`}
      style={{
        background: STACK_BG,
        color: TEXT_MUTED,
        fontFamily: "'GT America', var(--font-inter), sans-serif",
      }}
    >
      <main className="mx-auto w-full max-w-[960px] px-6 py-16 sm:py-24">
        <header className="mb-16 flex flex-col gap-6">
          <Link href="/" className="shrink-0 self-start">
            <img
              src={AVATAR_SQUARE}
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
              Stack
            </h1>
            <div className="max-w-[560px] font-extralight text-xl leading-normal" style={{ color: TEXT_MUTED }}>
              <p className="mb-0">A software designer based in Paris, France</p>
              <p>currently working with Permanent</p>
            </div>
          </div>
        </header>

        <section className="w-full max-w-[960px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between w-full">
              <h2
                className={`${dmSans.className} text-2xl ${headingClass}`}
                style={{ color: SECTION_TITLE }}
              >
                Services
              </h2>
              <div className="relative" ref={platformsRef}>
                <button
                  type="button"
                  onClick={() => setPlatformsOpen((o) => !o)}
                  aria-expanded={platformsOpen}
                  aria-haspopup="listbox"
                  className="flex items-end gap-0.5 rounded-md font-extralight text-xl hover:opacity-90"
                  style={{ color: TEXT_MUTED }}
                >
                  {selectedPlatform}
                  <img
                    src={ICON_CARET_DOWN}
                    alt=""
                    width={20}
                    height={20}
                    className={`size-5 shrink-0 transition-transform ${platformsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {platformsOpen && (
                  <div
                    className="absolute right-0 top-full z-20 mt-2 flex w-48 flex-col rounded-md border py-2 shadow-lg"
                    style={{
                      background: STACK_BG,
                      borderColor: TEXT_MUTED,
                      color: TEXT_MUTED,
                    }}
                  >
                    {PLATFORM_OPTIONS.map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => {
                          setSelectedPlatform(platform);
                          setPlatformsOpen(false);
                        }}
                        className="px-4 py-2 text-left font-extralight text-xl hover:opacity-90"
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="h-px w-full border-t border-dashed"
              style={{ borderColor: TEXT_MUTED }}
            />
          </div>

          <div className="flex flex-col gap-3">
            {filteredServices.map((service) => (
              <div
                key={service.name}
                className="flex items-center gap-2 w-full"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="overflow-hidden rounded-md shrink-0 size-6">
                    <img
                      src={STACK_ICONS[service.iconIndex]}
                      alt=""
                      width={24}
                      height={24}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 items-end gap-2 overflow-visible">
                    <span className="text-xl font-medium leading-normal shrink-0">
                      {service.name}
                    </span>
                    <span
                      className="min-w-0 flex-1 self-end mb-1.5 h-px block shrink-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(to right, ${TEXT_MUTED} 0px, ${TEXT_MUTED} 1px, transparent 1px, transparent 5px)`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex shrink-0 items-center font-extralight text-xl leading-normal text-right">
                  <span className="whitespace-nowrap">{service.platforms}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
