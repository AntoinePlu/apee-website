"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { DM_Sans, Inter } from "next/font/google";

const COMPANIES_LIST = [
  "Obvious",
  "Tembo",
  "Antimetal",
  "Select",
  "Crescent",
  "Fanatics",
  "Harmonic",
  "Permanent",
  "Pipe",
  "Memo Bank",
  "Société Générale",
  "Shine",
  "Popdog",
  "Mana Studio",
  "Tesorio",
  "Area1 Security",
  "MindTickle",
  "Anasen",
  "MeilleurAgents",
  "Talkus",
  "Feedly",
  "Algolia",
  "FollowAnalytics",
  "Over-Graph",
  "909C",
  "Orange",
  "Clarins",
  "Peugeot",
];

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

const TRACK_RECORDS_BG = "#162625";
const SECTION_TITLE = "#c3d1bc";
const PAGE_TITLE = "#dfe6db";
const TEXT_MUTED = "#91ac86";

const TYPES_LIST = [
  "Major contribution",
  "Minor contribution",
  "Career",
  "Awards",
  "Side-project",
];

const FIGMA_LOGO =
  "https://www.figma.com/api/mcp/asset/1af2bbce-1077-4a47-bfbb-22d51caf4a8d";

/** Icons from Figma (Apee-2025, node 2027-758) – public/icons/ */
const ICON_CARET_DOWN = "/icons/Icon-caret-down.svg";
/** Exact icon order for the 10 Featured rows (matches Figma design) */
const FEATURED_ICONS = [
  "/icons/Icon-tada.svg",         // 1
  "/icons/Icon-rocket.svg",       // 2
  "/icons/Icon-component.svg",    // 3
  "/icons/Icon-star-shiny.svg",   // 4
  "/icons/Icon-star-shiny.svg",   // 5
  "/icons/Icon-signature.svg",    // 6
  "/icons/Icon-component.svg",    // 7
  "/icons/Icon-rocket.svg",       // 8
  "/icons/Icon-rocket.svg",       // 9
  "/icons/Icon-rocket.svg",       // 10
];

const FEATURED: { title: string; type: string; date: string }[] = [
  { title: "Permanent 2 years anniversary", type: "Career", date: "Feb 2026" },
  { title: "Obvious Product release", type: "Major contribution", date: "Feb 2026" },
  { title: "Antimetal Design System", type: "Major contribution", date: "Jan 2026" },
  { title: "Tembo Product redesign", type: "Major contribution", date: "Nov 2025" },
  { title: "Select Product redesign", type: "Major contribution", date: "Jun 2025" },
  { title: "Joined Permanent as Staff Product Designer", type: "Career", date: "Feb 2024" },
  { title: "Pipe Design System V2", type: "Major contribution", date: "Mar 2023" },
  { title: "Memo Bank Virtual & Physical Business cards", type: "Major contribution", date: "Sep 2022" },
  { title: "Memo Bank SEPA Instant transfers", type: "Major contribution", date: "Jun 2022" },
  { title: "Memo Bank Virtual IBANs", type: "Major contribution", date: "Oct 2021" },
];

const ALL_RECORDS_BY_YEAR: Record<string, { title: string; type: string; date: string }[]> = {
  "2026": [
    { title: "Obvious Desktop app", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Mobile app", type: "Minor contribution", date: "Mar 2026" },
    { title: "Obvious Meeting agent", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Notifications center", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Assistant", type: "Minor contribution", date: "Mar 2026" },
    { title: "Obvious Sub-agents", type: "Minor contribution", date: "Mar 2026" },
    { title: "Obvious Shortcuts", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Homepage", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Knowledge base", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Connectors", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Checkpoints", type: "Major contribution", date: "Mar 2026" },
    { title: "Tembo Reviews", type: "Major contribution", date: "Mar 2026" },
    { title: "Tembo Pull Requests", type: "Major contribution", date: "Feb 2026" },
    { title: "Tembo Chat mode", type: "Major contribution", date: "Jan 2026" },
    { title: "Tembo Automations", type: "Major contribution", date: "Jan 2026" },
  ],
  "2025": [
    { title: "Antimetal Design System", type: "Major contribution", date: "Mar 2026" },
    { title: "Tembo Design System", type: "Major contribution", date: "Mar 2026" },
    { title: "Tembo Product Vision", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Design System", type: "Major contribution", date: "Mar 2026" },
    { title: "Obvious Product Vision", type: "Major contribution", date: "Mar 2026" },
    { title: "Select Agent", type: "Major contribution", date: "Mar 2026" },
    { title: "Select Product redesign", type: "Major contribution", date: "Mar 2026" },
    { title: "Select Design System", type: "Major contribution", date: "Mar 2026" },
    { title: "Select Design vision", type: "Major contribution", date: "Mar 2026" },
    { title: "Fanatics Collections", type: "Major contribution", date: "Mar 2026" },
    { title: "Fanatics Peer-to-Peer Trades", type: "Major contribution", date: "Mar 2026" },
    { title: "Fanatics Public Profile", type: "Major contribution", date: "Mar 2026" },
    { title: "Fanatics Showcase", type: "Major contribution", date: "Mar 2026" },
  ],
  "2024": [
    { title: "Crescent Product redesign", type: "Major contribution", date: "Mar 2026" },
    { title: "Crescent Design system", type: "Major contribution", date: "Mar 2026" },
    { title: "Crescent Product vision", type: "Major contribution", date: "Mar 2026" },
    { title: "Harmonic Product redesign", type: "Major contribution", date: "Mar 2026" },
    { title: "Harmonic Product vision", type: "Major contribution", date: "Mar 2026" },
    { title: "Harmonic for Investors", type: "Major contribution", date: "Mar 2026" },
    { title: "Harmonic Integrations", type: "Major contribution", date: "Mar 2026" },
    { title: "Harmonic Profile activities", type: "Major contribution", date: "Mar 2026" },
    { title: "Harmonic People search", type: "Major contribution", date: "Mar 2026" },
    { title: "Joined Permanent as Staff Product Designer", type: "Career", date: "Feb 2024" },
  ],
  "2023": [
    { title: "Société Générale Mobile app vision", type: "Major contribution", date: "Mar 2023" },
    { title: "Created APEE as Independent Designer", type: "Major contribution", date: "Sep 2023" },
    { title: "Pipe Design System V2", type: "Major contribution", date: "Apr 2023" },
  ],
  "2022": [
    { title: "Joined Pipe as Design System Lead", type: "Career", date: "Mar 2022" },
    { title: "Memo Bank SWIFT International Transfers", type: "Major contribution", date: "Sep 2022" },
    { title: "Memo Bank Virtual & Physical Business cards", type: "Major contribution", date: "Sep 2022" },
    { title: "Memo Bank SEPA Instant transfers", type: "Major contribution", date: "Jun 2022" },
    { title: "Memo Bank Virtual IBANs", type: "Major contribution", date: "Jun 2022" },
  ],
  "2021": [
    { title: "Memo Bank Short-term credits", type: "Career", date: "Oct 2021" },
    { title: "Memo Bank Long-term credits", type: "Major contribution", date: "Oct 2021" },
  ],
  "2020": [
    { title: "Memo Bank Public opening", type: "Minor contribution", date: "Sep 2020" },
    { title: "Joined Memo Bank as Senior Product Designer", type: "Career", date: "Jun 2020" },
  ],
  "2019": [
    { title: "Popdog Product redesign", type: "Major contribution", date: "Jun 2019" },
    { title: "Co-founded Mana Studio", type: "Career", date: "Sep 2019" },
    { title: "Shine Desktop Banking experience", type: "Major contribution", date: "Sep 2019" },
    { title: "Area1 Security Product redesign", type: "Major contribution", date: "Sep 2019" },
  ],
  "2018": [
    { title: "Tesorio Product redesign", type: "Major contribution", date: "Sep 2018" },
    { title: "MindTickle Product redesign", type: "Major contribution", date: "Sep 2018" },
    { title: "Anasen Data Analytics Product redesign", type: "Major contribution", date: "Jun 2018" },
    { title: "MeilleurAgents B2B Properties management", type: "Major contribution", date: "Sep 2018" },
  ],
  "2017": [
    { title: "Talkus Product redesign", type: "Major contribution", date: "Sep 2017" },
    { title: "Feedly Feed Organization", type: "Major contribution", date: "Sep 2017" },
    { title: "Moved as Independent Designer", type: "Career", date: "Sep 2017" },
    { title: "Algolia InstantSearch", type: "Major contribution", date: "Sep 2017" },
    { title: "Algolia Community", type: "Major contribution", date: "Jun 2017" },
  ],
  "2016": [
    { title: "Algolia Docsearch", type: "Major contribution", date: "Sep 2016" },
    { title: "Algolia Places", type: "Major contribution", date: "Sep 2016" },
    { title: "Algolia integration for WordPress", type: "Major contribution", date: "Sep 2016" },
    { title: "Algolia integration for Magento", type: "Major contribution", date: "Jun 2016" },
    { title: "Algolia integration for Shopify", type: "Major contribution", date: "Jun 2016" },
    { title: "Joined Algolia as Designer", type: "Major contribution", date: "Jan 2016" },
  ],
  "2015": [],
  "2014": [
    { title: "FollowAnalytics Mobile Push Campaign", type: "Major contribution", date: "Sep 2014" },
    { title: "FollowAnalytics Competitive Analysis", type: "Major contribution", date: "Sep 2014" },
    { title: "FollowAnalytics Product redesign", type: "Major contribution", date: "Sep 2014" },
    { title: "Joined FollowAnalytics as Product Designer", type: "Career", date: "Jun 2014" },
    { title: "Over-Graph Mobile App", type: "Major contribution", date: "Jan 2014" },
  ],
  "2013": [
    { title: "Switched to Over-Graph full time", type: "Career", date: "Dec 2013" },
    { title: "Site of the Day Awwwards", type: "Awards", date: "Dec 2013" },
    { title: "Site of the Month CSS Awards", type: "Awards", date: "Nov 2013" },
    { title: "The House of Magic digital experience", type: "Major contribution", date: "Oct 2013" },
    { title: "Joined 909C as Product Designer", type: "Career", date: "Oct 2013" },
    { title: "Graduated in Bachelor Project Management", type: "Career", date: "Sep 2013" },
  ],
  "2012": [
    { title: "Over-Graph Desktop experience", type: "Major contribution", date: "Nov 2012" },
    { title: "Orange Mix", type: "Major contribution", date: "Sep 2012" },
    { title: "Clarins Social App", type: "Career", date: "Sep 2012" },
  ],
  "2011": [
    { title: "Joined 909C as Apprentice Designer", type: "Career", date: "Sep 2011" },
    { title: "Joined 909C as Intern Designer", type: "Career", date: "Jun 2011" },
  ],
  "2010": [
    { title: "Finalist at LeWeb Startup competition with Staround", type: "Side-project", date: "Dec 2010" },
    { title: "BeMyApp Hackathon winner with Staround", type: "Side-project", date: "Jun 2010" },
    { title: "Joined IESA Multimedia in Project Management", type: "Career", date: "Jun 2010" },
    { title: "Switching Career to Design", type: "Career", date: "Jun 2010" },
    { title: "Graduated in Automotive Body Repair & Paint Refinishing", type: "Career", date: "Jun 2010" },
  ],
  "2009": [],
  "2008": [
    { title: "Graduated in Vehicle Paint Refinishing", type: "Career", date: "Jun 2008" },
    { title: "Graduated in Automotive Body Repair", type: "Career", date: "Jun 2008" },
    { title: "Joined Peugeot Automobiles as Body & Paint Technician", type: "Career", date: "Jun 2008" },
  ],
};

const headingClass = "font-bold leading-normal tracking-normal";

function getCompanyFromTitle(title: string): string | null {
  const sorted = [...COMPANIES_LIST].sort((a, b) => b.length - a.length);
  for (const company of sorted) {
    if (
      title === company ||
      title.startsWith(company + " ") ||
      title.includes(" " + company + " ") ||
      title.endsWith(" " + company)
    )
      return company;
  }
  return null;
}

function filterRecordsByCompanies(
  recordsByYear: Record<string, { title: string; type: string; date: string }[]>,
  selected: Set<string>
): Record<string, { title: string; type: string; date: string }[]> {
  if (selected.size === 0) return recordsByYear;
  const out: Record<string, { title: string; type: string; date: string }[]> = {};
  for (const [year, records] of Object.entries(recordsByYear)) {
    const filtered = records.filter((r) => {
      const company = getCompanyFromTitle(r.title);
      return company !== null && selected.has(company);
    });
    if (filtered.length > 0) out[year] = filtered;
  }
  return out;
}

function filterRecordsByTypes(
  recordsByYear: Record<string, { title: string; type: string; date: string }[]>,
  selected: Set<string>
): Record<string, { title: string; type: string; date: string }[]> {
  if (selected.size === 0) return recordsByYear;
  const out: Record<string, { title: string; type: string; date: string }[]> = {};
  for (const [year, records] of Object.entries(recordsByYear)) {
    const filtered = records.filter((r) => selected.has(r.type));
    if (filtered.length > 0) out[year] = filtered;
  }
  return out;
}

function TitleWithTooltipWhenTruncated({ title }: { title: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollWidth > el.clientWidth);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [title]);

  return (
    <span className="relative group block min-w-0 overflow-visible">
      <span ref={ref} className="block truncate text-xl font-medium leading-normal">
        {title}
      </span>
      {isTruncated && (
        <span
          role="tooltip"
          className="absolute bottom-full left-0 z-50 mb-1 max-w-[min(100vw,480px)] rounded px-2 py-1.5 whitespace-nowrap border opacity-0 shadow-md transition-opacity pointer-events-none group-hover:opacity-100"
          style={{
            background: TRACK_RECORDS_BG,
            color: PAGE_TITLE,
            borderColor: TEXT_MUTED,
          }}
        >
          {title}
        </span>
      )}
    </span>
  );
}

export default function TrackRecords() {
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [companyFilter, setCompanyFilter] = useState("");
  const companiesRef = useRef<HTMLDivElement>(null);

  const [typesOpen, setTypesOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [typeFilter, setTypeFilter] = useState("");
  const typesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (companiesRef.current && !companiesRef.current.contains(target)) setCompaniesOpen(false);
      if (typesRef.current && !typesRef.current.contains(target)) setTypesOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const byCompany = filterRecordsByCompanies(ALL_RECORDS_BY_YEAR, selectedCompanies);
  const filteredRecordsByYear = filterRecordsByTypes(byCompany, selectedTypes);

  const filteredCompanies = COMPANIES_LIST.filter((c) =>
    c.toLowerCase().includes(companyFilter.toLowerCase().trim())
  );
  const filteredTypes = TYPES_LIST.filter((t) =>
    t.toLowerCase().includes(typeFilter.toLowerCase().trim())
  );

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(company)) next.delete(company);
      else next.add(company);
      return next;
    });
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

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
              Track Records
            </h1>
            <p className="max-w-[560px] font-extralight text-xl leading-normal" style={{ color: TEXT_MUTED }}>
              A full list of my work: product and feature contributions, side{"\u00A0"}projects, career moves, and industry recognitions.
            </p>
          </div>
        </header>

        <section className="mb-20 flex flex-col gap-6">
          <h2
            className={`${dmSans.className} text-2xl ${headingClass}`}
            style={{ color: SECTION_TITLE }}
          >
            Featured
          </h2>
          <div className="flex flex-col gap-3">
            {FEATURED.map((row, i) => (
              <div
                key={`${row.title}-${row.date}`}
                className="flex items-center gap-2 w-full"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <img src={FEATURED_ICONS[i]} alt="" width={20} height={20} className="size-5 shrink-0" />
                  <div className="flex min-w-0 flex-1 items-end gap-2 overflow-visible">
                    <TitleWithTooltipWhenTruncated title={row.title} />
                    <span
                      className="min-w-0 flex-1 self-end mb-1.5 h-px block shrink-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(to right, ${TEXT_MUTED} 0px, ${TEXT_MUTED} 1px, transparent 1px, transparent 5px)`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-0 font-extralight text-xl leading-normal">
                  <span className="w-max shrink-0 whitespace-nowrap lg:w-[230px]">{row.type}</span>
                  <span className="hidden w-[87px] shrink-0 text-right tabular-nums whitespace-nowrap lg:block">{row.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-[960px]">
          <div className="mb-3 flex items-center justify-between">
            <h2
              className={`${dmSans.className} text-2xl ${headingClass}`}
              style={{ color: SECTION_TITLE }}
            >
              All Records
            </h2>
            <div className="flex items-center gap-10">
              <div className="relative" ref={companiesRef}>
                <button
                  type="button"
                  onClick={() => setCompaniesOpen((o) => !o)}
                  aria-expanded={companiesOpen}
                  aria-haspopup="listbox"
                  className="flex items-end gap-0.5 rounded-md font-extralight text-xl hover:opacity-90"
                  style={{ color: TEXT_MUTED }}
                >
                  Companies
                  <img src={ICON_CARET_DOWN} alt="" width={20} height={20} className={`size-5 shrink-0 transition-transform ${companiesOpen ? "rotate-180" : ""}`} />
                </button>
                {companiesOpen && (
                  <div
                    className="absolute right-0 top-full z-20 mt-2 flex w-64 flex-col rounded-md border py-2 shadow-lg"
                    style={{
                      background: TRACK_RECORDS_BG,
                      borderColor: TEXT_MUTED,
                      color: TEXT_MUTED,
                    }}
                  >
                    <input
                      type="text"
                      aria-label="Filter companies"
                      placeholder="Filter companies..."
                      value={companyFilter}
                      onChange={(e) => setCompanyFilter(e.target.value)}
                      className="mx-2 mb-2 rounded px-3 py-2 text-base font-extralight outline-none placeholder:opacity-60"
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        color: PAGE_TITLE,
                        border: `1px solid ${TEXT_MUTED}`,
                      }}
                    />
                    <div className="max-h-72 overflow-y-auto">
                      {filteredCompanies.map((company) => (
                        <label
                          key={company}
                          className="flex cursor-pointer items-center gap-2 px-4 py-2 font-extralight text-xl hover:opacity-90"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCompanies.has(company)}
                            onChange={() => toggleCompany(company)}
                            className="h-4 w-4 rounded border"
                            style={{ accentColor: TEXT_MUTED }}
                          />
                          <span>{company}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={typesRef}>
                <button
                  type="button"
                  onClick={() => setTypesOpen((o) => !o)}
                  aria-expanded={typesOpen}
                  aria-haspopup="listbox"
                  className="flex items-end gap-0.5 rounded-md font-extralight text-xl hover:opacity-90"
                  style={{ color: TEXT_MUTED }}
                >
                  Types
                  <img src={ICON_CARET_DOWN} alt="" width={20} height={20} className={`size-5 shrink-0 transition-transform ${typesOpen ? "rotate-180" : ""}`} />
                </button>
                {typesOpen && (
                  <div
                    className="absolute right-0 top-full z-20 mt-2 flex w-64 flex-col rounded-md border py-2 shadow-lg"
                    style={{
                      background: TRACK_RECORDS_BG,
                      borderColor: TEXT_MUTED,
                      color: TEXT_MUTED,
                    }}
                  >
                    <input
                      type="text"
                      aria-label="Filter types"
                      placeholder="Filter types..."
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="mx-2 mb-2 rounded px-3 py-2 text-base font-extralight outline-none placeholder:opacity-60"
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        color: PAGE_TITLE,
                        border: `1px solid ${TEXT_MUTED}`,
                      }}
                    />
                    <div className="max-h-72 overflow-y-auto">
                      {filteredTypes.map((type) => (
                        <label
                          key={type}
                          className="flex cursor-pointer items-center gap-2 px-4 py-2 font-extralight text-xl hover:opacity-90"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTypes.has(type)}
                            onChange={() => toggleType(type)}
                            className="h-4 w-4 rounded border"
                            style={{ accentColor: TEXT_MUTED }}
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="mb-4 h-px w-full block"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, ${TEXT_MUTED} 0px, ${TEXT_MUTED} 1px, transparent 1px, transparent 5px)`,
            }}
          />

          <div className="flex flex-col gap-12">
            {Object.entries(filteredRecordsByYear)
              .filter(([, records]) => records.length > 0)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([year, records]) => (
                <div key={year} className="flex gap-6">
                  <span
                    className="sticky top-0 z-10 w-[50px] shrink-0 self-start text-xl font-normal leading-normal tabular-nums"
                    style={{ background: TRACK_RECORDS_BG }}
                  >
                    {year}
                  </span>
                  <div className="min-w-0 flex-1 flex flex-col gap-2">
                    {records.map((row) => (
                      <div
                        key={`${year}-${row.title}-${row.date}`}
                        className="flex items-center gap-2 w-full"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="flex min-w-0 flex-1 items-end gap-2 overflow-visible">
                            <TitleWithTooltipWhenTruncated title={row.title} />
                            <span
                              className="min-w-0 flex-1 self-end mb-1.5 h-px block shrink-0"
                              style={{
                                backgroundImage: `repeating-linear-gradient(to right, ${TEXT_MUTED} 0px, ${TEXT_MUTED} 1px, transparent 1px, transparent 5px)`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-0 font-extralight text-xl leading-normal">
                          <span className="w-max shrink-0 whitespace-nowrap lg:w-[230px]">{row.type}</span>
                          <span className="hidden w-[87px] shrink-0 text-right tabular-nums whitespace-nowrap lg:block">{row.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
