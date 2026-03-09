import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <header className="mb-16">
          <nav className="flex justify-between text-sm text-[var(--muted)]">
            <Link href="/" className="font-medium text-foreground hover:text-foreground">
              apee
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-foreground">
                About
              </Link>
              <Link href="/track-records" className="hover:text-foreground transition-colors">
                Track records
              </Link>
              <Link href="/stack" className="hover:text-foreground transition-colors">
                Stack
              </Link>
            </div>
          </nav>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none">
          <h1 className="text-3xl font-semibold tracking-tight mb-6">About</h1>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            This is a placeholder about page. Replace it with your own story,
            background, and what you’re working on.
          </p>
          <p className="text-[var(--muted)] leading-relaxed">
            You can edit this at <code className="text-foreground text-sm bg-[var(--muted)]/20 px-1.5 py-0.5 rounded">src/app/about/page.tsx</code>.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back home
          </Link>
        </article>
      </main>
    </div>
  );
}
