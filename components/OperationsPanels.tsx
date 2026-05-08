"use client";

import type { ReactNode } from "react";
import { Gauge, Target, Trophy } from "lucide-react";
import type { DashboardPayload } from "@/lib/types";
import { AnimatedNumber } from "./AnimatedNumber";

export function GoalPanel({ data }: { data: DashboardPayload }) {
  const revenueProgress = Math.min(100, Math.round((data.kpis.revenueToday / data.settings.dailyRevenueGoal) * 100));
  const orderProgress = Math.min(100, Math.round((data.kpis.ordersToday / data.settings.dailyOrderGoal) * 100));

  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <Target className="text-lime" />
        <h2 className="text-xl font-black">Daily Goal Tracker</h2>
      </div>
      <MetricBar label="Revenue" value={revenueProgress} amount={<AnimatedNumber value={data.kpis.revenueToday} currency />} />
      <MetricBar label="Orders" value={orderProgress} amount={<AnimatedNumber value={data.kpis.ordersToday} />} />
      <p className="mt-5 text-4xl font-black text-white">{data.completionPercentage}%</p>
      <p className="text-sm uppercase tracking-[0.18em] text-white/42">production completion</p>
    </section>
  );
}

export function PrinterPanel({ data }: { data: DashboardPayload }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <Gauge className="text-cyan" />
        <h2 className="text-xl font-black">Printer Utilization</h2>
      </div>
      <div className="space-y-4">
        {data.printerUtilization.map((printer) => (
          <MetricBar key={printer.name} label={printer.name} value={printer.utilization} amount={printer.activeJob} />
        ))}
      </div>
    </section>
  );
}

export function LeaderboardPanel({ data }: { data: DashboardPayload }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <Trophy className="text-amber" />
        <h2 className="text-xl font-black">Employee Leaderboard</h2>
      </div>
      <div className="space-y-3">
        {data.employeeLeaderboard.map((employee, index) => (
          <div key={employee.name} className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.035] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-sm font-black text-white/74">{index + 1}</span>
              <div>
                <p className="font-bold text-white">{employee.name}</p>
                <p className="text-xs text-white/42">{employee.accuracy}% QA accuracy</p>
              </div>
            </div>
            <p className="text-2xl font-black text-lime">{employee.completed}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TopProductsPanel({ data }: { data: DashboardPayload }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-5 text-xl font-black">Top Selling Products</h2>
      <div className="space-y-3">
        {data.topProducts.map((product) => (
          <div key={product.name} className="flex items-center justify-between border-b border-line pb-3 last:border-none last:pb-0">
            <div>
              <p className="font-bold text-white">{product.name}</p>
              <p className="text-sm text-white/42">{product.units} units</p>
            </div>
            <p className="text-lg font-black text-cyan">${product.revenue.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MetricBar({ label, value, amount }: { label: string; value: number; amount: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-bold text-white/76">{label}</span>
        <span className="font-black text-white">{amount}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan via-lime to-amber transition-all duration-700"
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );
}
