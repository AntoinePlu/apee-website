import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiCloseCircleLine,
  RiShieldCheckLine,
  RiWifiLine,
  RiWifiOffLine,
  RiServerLine,
  RiAlertLine,
  RiLockLine,
  RiUserLine,
  RiTimeLine,
  RiFlashlightLine,
  RiGitBranchLine,
  RiRefreshLine,
} from "@remixicon/react";

function DemoLabel({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}

export default function StatusBadgeExperiment() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <Link
          href="/experiments"
          className="mb-8 inline-block text-sm text-[var(--muted)] transition-colors hover:text-foreground"
        >
          ← Back to experiments
        </Link>

        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          Status badge
        </h1>
        <p className="mb-12 text-[var(--muted)]">
          A pill badge with a left label and a right label separated by a
          divider — useful for surfacing system state, feature flags, or audit
          info at a glance.
        </p>

        <section className="space-y-12">
          <div>
            <DemoLabel
              label="Status variants"
              description="success, error, and default — controls the left icon colour."
            />
            <div className="flex flex-wrap gap-3">
              <StatusBadge
                leftIcon={RiCheckboxCircleFill}
                rightIcon={RiCloseCircleLine}
                leftLabel="Live"
                rightLabel="Audit trails"
                status="success"
              />
              <StatusBadge
                leftIcon={RiShieldCheckLine}
                rightIcon={RiCloseCircleLine}
                leftLabel="Protection"
                rightLabel="SSO login"
                status="success"
              />
              <StatusBadge
                leftIcon={RiCloseCircleFill}
                rightIcon={RiShieldCheckLine}
                leftLabel="Safety checks"
                rightLabel="Production"
                status="error"
              />
              <StatusBadge
                leftIcon={RiAlertLine}
                rightIcon={RiServerLine}
                leftLabel="Degraded"
                rightLabel="US-East-1"
                status="error"
              />
              <StatusBadge
                leftIcon={RiTimeLine}
                rightIcon={RiUserLine}
                leftLabel="Pending"
                rightLabel="Admin review"
                status="default"
              />
            </div>
          </div>

          <div>
            <DemoLabel
              label="Infrastructure"
              description="Network, server, and connectivity state."
            />
            <div className="flex flex-wrap gap-3">
              <StatusBadge
                leftIcon={RiWifiLine}
                rightIcon={RiServerLine}
                leftLabel="Connected"
                rightLabel="eu-west-2"
                status="success"
              />
              <StatusBadge
                leftIcon={RiWifiOffLine}
                rightIcon={RiServerLine}
                leftLabel="Offline"
                rightLabel="ap-southeast-1"
                status="error"
              />
              <StatusBadge
                leftIcon={RiFlashlightLine}
                rightIcon={RiTimeLine}
                leftLabel="High load"
                rightLabel="14 ms p99"
                status="error"
              />
              <StatusBadge
                leftIcon={RiCheckboxCircleFill}
                rightIcon={RiTimeLine}
                leftLabel="Healthy"
                rightLabel="3 ms p99"
                status="success"
              />
            </div>
          </div>

          <div>
            <DemoLabel
              label="Deployment & CI"
              description="Build pipeline and release status."
            />
            <div className="flex flex-wrap gap-3">
              <StatusBadge
                leftIcon={RiCheckboxCircleFill}
                rightIcon={RiGitBranchLine}
                leftLabel="Deployed"
                rightLabel="main"
                status="success"
              />
              <StatusBadge
                leftIcon={RiRefreshLine}
                rightIcon={RiGitBranchLine}
                leftLabel="Building"
                rightLabel="feat/auth"
                status="default"
              />
              <StatusBadge
                leftIcon={RiCloseCircleFill}
                rightIcon={RiGitBranchLine}
                leftLabel="Failed"
                rightLabel="feat/payments"
                status="error"
              />
              <StatusBadge
                leftIcon={RiLockLine}
                rightIcon={RiShieldCheckLine}
                leftLabel="Locked"
                rightLabel="CODEOWNERS"
                status="default"
              />
            </div>
          </div>

          <div>
            <DemoLabel
              label="No icons"
              description="Works without icons — just the two labels with the divider."
            />
            <div className="flex flex-wrap gap-3">
              <StatusBadge leftLabel="Status" rightLabel="Operational" status="success" />
              <StatusBadge leftLabel="Region" rightLabel="us-east-1" />
              <StatusBadge leftLabel="Plan" rightLabel="Enterprise" />
              <StatusBadge leftLabel="Version" rightLabel="v2.4.1" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
