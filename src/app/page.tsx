import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <header className="mb-16">
          <nav className="flex justify-between text-sm text-[var(--muted)]">
            <span className="font-medium text-foreground">apee</span>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/track-records" className="hover:text-foreground transition-colors">
                Track records
              </Link>
              <Link href="/stack" className="hover:text-foreground transition-colors">
                Stack
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:hello@example.com"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </nav>
        </header>

        <section className="space-y-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Hi, I&apos;m{" "}
            <span className="text-[var(--accent)]">Your Name</span>
          </h1>
          <p className="text-lg leading-relaxed text-[var(--muted)] max-w-xl">
            I build things for the web. This is my personal site—a place for
            projects, writing, and whatever else I’m up to.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/about"
              className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              About me
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-[var(--muted)] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              View projects
            </a>
          </div>
        </section>

        <footer className="mt-24 border-t border-[var(--muted)]/30 pt-8 text-sm text-[var(--muted)]">
          <p>© {new Date().getFullYear()}. Built with Next.js and deployed on Vercel.</p>
        </footer>
      </main>
    </div>
  );
}
