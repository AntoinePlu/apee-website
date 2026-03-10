"use client"

import { useState } from "react"
import Link from "next/link"
import { ToastSave } from "@/components/ui/toast-save"

function ToastSaveDemo() {
  const [state, setState] = useState<"initial" | "loading" | "success">("initial")

  const handleSave = () => {
    setState("loading")
    setTimeout(() => {
      setState("success")
      setTimeout(() => {
        setState("initial")
      }, 2000)
    }, 2000)
  }

  const handleReset = () => {
    setState("initial")
  }

  return (
    <div className="flex items-center justify-center p-6">
      <ToastSave
        state={state}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  )
}

export default function ToastSaveExperiment() {
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
          Toast save
        </h1>
        <p className="text-[var(--muted)] mb-12">
          Animated save toast with unsaved, loading, and success states. Built with Framer Motion.
        </p>

        <section className="space-y-16">
          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6">
              Interactive demo
            </h2>
            <ToastSaveDemo />
          </div>

          <div>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6">
              States
            </h2>
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--muted)]">Initial</span>
                <ToastSave state="initial" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--muted)]">Loading</span>
                <ToastSave state="loading" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--muted)]">Success</span>
                <ToastSave state="success" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
