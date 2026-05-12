"use client";

import useSWR from "swr";
import { AlertTriangle, CheckCircle2, RefreshCw, Trash2 } from "lucide-react";
import type { IntegrationLogEntry } from "../lib/integration-log";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to load WooCommerce logs");
  return response.json();
};

export function WooCommerceErrorDashboard() {
  const { data, mutate, error } = useSWR<{ logs: IntegrationLogEntry[] }>("/api/woocommerce/logs", fetcher, {
    refreshInterval: 60000
  });

  async function runSync() {
    await fetch("/api/woocommerce/sync");
    mutate();
  }

  async function clearLogs() {
    await fetch("/api/woocommerce/logs", { method: "DELETE" });
    mutate();
  }

  const logs = data?.logs ?? [];
  const errors = logs.filter((log) => log.level === "error").length;
  const warnings = logs.filter((log) => log.level === "warning").length;

  return (
    <main className="relative min-h-screen bg-ink p-6 text-white">
      <div className="grid-glow pointer-events-none fixed inset-0 opacity-70" />
      <div className="relative z-10 mx-auto max-w-7xl space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-cyan">WooCommerce Integration</p>
            <h1 className="mt-2 text-4xl font-black">Sync Health & Error Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={runSync} className="inline-flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 font-black text-cyan">
              <RefreshCw size={18} /> Run Sync
            </button>
            <button onClick={clearLogs} className="inline-flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 font-black text-danger">
              <Trash2 size={18} /> Clear Logs
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <HealthCard title="Errors" value={errors} tone="danger" />
          <HealthCard title="Warnings" value={warnings} tone="amber" />
          <HealthCard title="Events" value={logs.length} tone="cyan" />
        </section>

        <section className="glass-panel overflow-hidden rounded-lg">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-2xl font-black">Integration Log</h2>
            <p className="text-sm text-white/42">Retries, webhook events, missing credentials, and sync failures.</p>
          </div>
          {error ? <p className="p-5 text-danger">Unable to load logs.</p> : null}
          <div className="divide-y divide-line">
            {logs.length ? (
              logs.map((log) => <LogRow key={log.id} log={log} />)
            ) : (
              <div className="flex items-center gap-3 p-5 text-lime">
                <CheckCircle2 /> No WooCommerce integration events logged yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function HealthCard({ title, value, tone }: { title: string; value: number; tone: "cyan" | "amber" | "danger" }) {
  const color = tone === "danger" ? "text-danger" : tone === "amber" ? "text-amber" : "text-cyan";
  return (
    <article className="glass-panel rounded-lg p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">{title}</p>
      <p className={`mt-3 text-5xl font-black ${color}`}>{value}</p>
    </article>
  );
}

function LogRow({ log }: { log: IntegrationLogEntry }) {
  const color = log.level === "error" ? "text-danger" : log.level === "warning" ? "text-amber" : "text-lime";

  return (
    <article className="grid gap-3 px-5 py-4 md:grid-cols-[150px_1fr_130px] md:items-center">
      <p className={`flex items-center gap-2 font-black uppercase ${color}`}>
        {log.level === "error" ? <AlertTriangle size={18} /> : null}
        {log.level}
      </p>
      <div>
        <p className="font-black">{log.message}</p>
        <p className="text-sm text-white/46">{log.detail ?? "No detail"} {log.orderId ? `· Order ${log.orderId}` : ""}</p>
      </div>
      <p className="text-right text-sm text-white/42">{new Date(log.createdAt).toLocaleTimeString()}</p>
    </article>
  );
}
