"use client";

import Link from "next/link";
import { FilesystemItem } from "@/components/ui/filesystem-item";

type Node = {
  name: string;
  nodes?: Node[];
};

const nodes: Node[] = [
  {
    name: "Home",
    nodes: [
      {
        name: "Movies",
        nodes: [
          {
            name: "Action",
            nodes: [
              {
                name: "2000s",
                nodes: [
                  { name: "Gladiator.mp4" },
                  { name: "The-Dark-Knight.mp4" },
                ],
              },
              { name: "2010s", nodes: [] },
            ],
          },
          {
            name: "Comedy",
            nodes: [{ name: "2000s", nodes: [{ name: "Superbad.mp4" }] }],
          },
          {
            name: "Drama",
            nodes: [
              { name: "2000s", nodes: [{ name: "American-Beauty.mp4" }] },
            ],
          },
        ],
      },
      {
        name: "Music",
        nodes: [
          { name: "Rock", nodes: [] },
          { name: "Classical", nodes: [] },
        ],
      },
      { name: "Pictures", nodes: [] },
      { name: "Documents", nodes: [] },
      { name: "passwords.txt" },
    ],
  },
];

export default function FilesystemItemExperiment() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <Link
          href="/experiments"
          className="inline-block text-sm text-[var(--muted)] hover:text-foreground transition-colors mb-8"
        >
          ← Back to experiments
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Filesystem tree
        </h1>
        <p className="text-[var(--muted)] mb-12">
          Recursive file-system explorer with two modes — static CSS rotation
          and spring-animated expand/collapse powered by Framer Motion.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4">
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
              Static
            </p>
            <div className="h-[480px] overflow-y-auto text-sm">
              <ul>
                {nodes.map((node) => (
                  <FilesystemItem node={node} key={node.name} />
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4">
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
              Animated
            </p>
            <div className="h-[480px] overflow-y-auto text-sm">
              <ul>
                {nodes.map((node) => (
                  <FilesystemItem node={node} key={node.name} animated />
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
