"use client";

import { Camera, Keyboard, PackageCheck, ScanLine } from "lucide-react";
import { useState } from "react";
import type { ProductionStage } from "../lib/enterprise-types";
import { useOps } from "../lib/useOps";

const stages: ProductionStage[] = [
  "Awaiting Artwork",
  "Ready to Print",
  "Printing",
  "Powdering",
  "Curing",
  "Cutting",
  "Packing",
  "Ready for Pickup",
  "Shipped",
  "Completed"
];

export function StationConsole() {
  const { data, mutate } = useOps(30);
  const [barcodeId, setBarcodeId] = useState("");
  const [stage, setStage] = useState<ProductionStage>("Printing");
  const [employee, setEmployee] = useState("Mara");
  const [message, setMessage] = useState("");

  async function submitScan() {
    const response = await fetch("/api/ops/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcodeId, stage, employee })
    });
    const result = await response.json();
    setMessage(response.ok ? `${result.orderNumber} moved to ${result.status}` : result.error);
    setBarcodeId("");
    mutate();
  }

  return (
    <main className="relative min-h-screen bg-ink p-5 text-white">
      <div className="grid-glow pointer-events-none fixed inset-0 opacity-70" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-5">
        <header>
          <p className="text-sm font-black uppercase tracking-[0.32em] text-cyan">Tablet Station</p>
          <h1 className="mt-2 text-4xl font-black">Barcode Production Console</h1>
        </header>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <ScanLine className="text-cyan" size={32} />
              <div>
                <h2 className="text-2xl font-black">Scan Order</h2>
                <p className="text-sm text-white/44">USB scanner input or camera scanner handoff</p>
              </div>
            </div>
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-white/42">Barcode ID</span>
              <input
                autoFocus
                value={barcodeId}
                onChange={(event) => setBarcodeId(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitScan();
                }}
                placeholder="SPD-DTF-10482"
                className="w-full rounded-lg border border-line bg-white/5 px-4 py-4 text-2xl font-black text-white outline-none focus:border-cyan"
              />
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-white/42">Stage</span>
                <select value={stage} onChange={(event) => setStage(event.target.value as ProductionStage)} className="w-full rounded-lg border border-line bg-[#111722] px-4 py-3">
                  {stages.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-white/42">Employee</span>
                <input value={employee} onChange={(event) => setEmployee(event.target.value)} className="w-full rounded-lg border border-line bg-white/5 px-4 py-3" />
              </label>
            </div>
            <button onClick={submitScan} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-5 py-4 text-lg font-black text-ink">
              <PackageCheck /> Update Production Stage
            </button>
            {message ? <p className="mt-4 rounded-lg border border-lime/30 bg-lime/10 p-3 font-bold text-lime">{message}</p> : null}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <Camera className="text-amber" />
                <p className="mt-2 font-black">Camera Scanner Ready</p>
                <p className="text-sm text-white/44">Hook a browser camera scanner library into this station surface.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <Keyboard className="text-lime" />
                <p className="mt-2 font-black">USB Scanner Ready</p>
                <p className="text-sm text-white/44">Most scanners type the barcode and press Enter automatically.</p>
              </div>
            </div>
          </div>

          <section className="glass-panel rounded-lg p-5">
            <h2 className="mb-4 text-2xl font-black">Active Station Queue</h2>
            <div className="space-y-3">
              {(data?.queue ?? []).slice(0, 8).map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <div>
                    <p className="text-lg font-black">{order.orderNumber} · {order.customer}</p>
                    <p className="text-sm text-white/42">{order.barcodeId} · {order.status} · {order.assignedPrinter}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${order.rush ? "bg-danger/15 text-danger" : "bg-cyan/10 text-cyan"}`}>
                    {order.rush ? "RUSH" : order.gangSheetSize}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
