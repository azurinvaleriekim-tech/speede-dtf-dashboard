"use client";

import type { ReactNode } from "react";
import { Bell, Monitor, RefreshCcw, Save, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import type { DashboardSettings, OrderStatus, QueueOrder } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${url}`);
  return response.json();
}

export function AdminPanel() {
  const [settings, setSettings] = useState<DashboardSettings | null>(null);
  const [orders, setOrders] = useState<QueueOrder[]>([]);
  const [message, setMessage] = useState("");

  async function load() {
    const [nextSettings, nextOrders] = await Promise.all([
      fetchJson<DashboardSettings>("/api/settings"),
      fetchJson<QueueOrder[]>("/api/orders")
    ]);
    setSettings(nextSettings);
    setOrders(nextOrders);
  }

  useEffect(() => {
    load();
  }, []);

  async function saveSettings() {
    if (!settings) return;
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });
    setSettings(await response.json());
    setMessage("Settings updated");
  }

  async function updateOrder(id: string, patch: Partial<QueueOrder>) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    const updated = await response.json();
    setOrders((current) => current.map((order) => (order.id === id ? updated : order)));
    setMessage(`${updated.orderNumber} updated`);
  }

  if (!settings) {
    return <main className="grid min-h-screen place-items-center bg-ink text-white">Loading admin controls...</main>;
  }

  return (
    <main className="min-h-screen bg-ink p-6 text-white">
      <div className="grid-glow pointer-events-none fixed inset-0 opacity-70" />
      <div className="relative z-10 mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan">Admin Panel</p>
            <h1 className="mt-2 text-4xl font-black">Production Controls</h1>
          </div>
          <button
            onClick={saveSettings}
            className="inline-flex items-center gap-2 rounded-lg border border-lime/30 bg-lime/15 px-5 py-3 font-black text-lime transition hover:bg-lime/20"
          >
            <Save size={18} /> Save Controls
          </button>
        </header>

        {message ? <div className="glass-panel rounded-lg px-4 py-3 text-sm font-bold text-lime">{message}</div> : null}

        <section className="grid gap-5 lg:grid-cols-3">
          <ControlCard icon={<SlidersHorizontal />} title="Operations Timing">
            <Field label="Cutoff time">
              <input
                type="time"
                value={settings.cutoffTime}
                onChange={(event) => setSettings({ ...settings, cutoffTime: event.target.value })}
                className="w-full rounded-lg border border-line bg-white/5 px-4 py-3 text-white"
              />
            </Field>
            <Field label="After hours">
              <input
                type="time"
                value={settings.afterHoursTime}
                onChange={(event) => setSettings({ ...settings, afterHoursTime: event.target.value })}
                className="w-full rounded-lg border border-line bg-white/5 px-4 py-3 text-white"
              />
            </Field>
          </ControlCard>

          <ControlCard icon={<RefreshCcw />} title="Refresh & TV Mode">
            <Field label="Refresh interval">
              <select
                value={settings.refreshIntervalSeconds}
                onChange={(event) => setSettings({ ...settings, refreshIntervalSeconds: Number(event.target.value) })}
                className="w-full rounded-lg border border-line bg-[#111722] px-4 py-3 text-white"
              >
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
                <option value={120}>2 minutes</option>
              </select>
            </Field>
            <Toggle
              icon={<Monitor size={18} />}
              label="TV mode"
              checked={settings.tvMode}
              onChange={(checked) => setSettings({ ...settings, tvMode: checked })}
            />
            <Toggle
              icon={<Bell size={18} />}
              label="Sound notifications"
              checked={settings.soundEnabled}
              onChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
            />
          </ControlCard>

          <ControlCard icon={<SlidersHorizontal />} title="Daily Goals">
            <Field label="Revenue goal">
              <input
                type="number"
                value={settings.dailyRevenueGoal}
                onChange={(event) => setSettings({ ...settings, dailyRevenueGoal: Number(event.target.value) })}
                className="w-full rounded-lg border border-line bg-white/5 px-4 py-3 text-white"
              />
            </Field>
            <Field label="Order goal">
              <input
                type="number"
                value={settings.dailyOrderGoal}
                onChange={(event) => setSettings({ ...settings, dailyOrderGoal: Number(event.target.value) })}
                className="w-full rounded-lg border border-line bg-white/5 px-4 py-3 text-white"
              />
            </Field>
          </ControlCard>
        </section>

        <section className="glass-panel overflow-hidden rounded-lg">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-2xl font-black">Manual Queue Overrides</h2>
            <p className="text-sm text-white/44">Change order status, rush priority, and operational ownership.</p>
          </div>
          <div className="divide-y divide-line">
            {orders.map((order) => (
              <div key={order.id} className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_170px_150px_150px] md:items-center">
                <div>
                  <p className="text-lg font-black">{order.orderNumber} · {order.customerName}</p>
                  <p className="text-sm text-white/44">{order.orderType} · {order.source} · Assigned to {order.assignedTo ?? "Unassigned"}</p>
                </div>
                <StatusBadge status={order.status} />
                <select
                  value={order.status}
                  onChange={(event) => updateOrder(order.id, { status: event.target.value as OrderStatus })}
                  className="rounded-lg border border-line bg-[#111722] px-3 py-2 text-white"
                >
                  <option>Waiting</option>
                  <option>Printing</option>
                  <option>Completed</option>
                </select>
                <button
                  onClick={() => updateOrder(order.id, { rush: !order.rush })}
                  className={`rounded-lg border px-3 py-2 font-black transition ${
                    order.rush ? "border-danger/40 bg-danger/15 text-danger" : "border-white/10 bg-white/5 text-white/60"
                  }`}
                >
                  {order.rush ? "Rush On" : "Rush Off"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ControlCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3 text-cyan">
        {icon}
        <h2 className="text-xl font-black text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-white/44">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  icon,
  label,
  checked,
  onChange
}: {
  icon: ReactNode;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-lg border border-line bg-white/[0.035] px-4 py-3 text-left"
    >
      <span className="flex items-center gap-2 font-bold text-white/76">
        {icon}
        {label}
      </span>
      <span className={`h-6 w-11 rounded-full p-1 transition ${checked ? "bg-lime" : "bg-white/16"}`}>
        <span className={`block h-4 w-4 rounded-full bg-ink transition ${checked ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}
