"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { ChartPoint } from "@/lib/types";

const tooltipStyle = {
  background: "#111722",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px",
  color: "#fff"
};

function ChartShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="glass-panel min-h-[240px] rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-white">{title}</h2>
        <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_16px_rgba(184,255,92,0.8)]" />
      </div>
      <div className="h-[178px]">{children}</div>
    </section>
  );
}

export function RevenueTrend({ data }: { data: ChartPoint[] }) {
  return (
    <ChartShell title="Revenue Trend Today">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#37D7FF" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#37D7FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="label" stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} width={42} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="value" stroke="#37D7FF" fill="url(#revenueFill)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function OrdersPerHour({ data }: { data: ChartPoint[] }) {
  return (
    <ChartShell title="Orders Per Hour">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="label" stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} width={32} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#B8FF5C" />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function ThroughputChart({ data }: { data: ChartPoint[] }) {
  return (
    <ChartShell title="Production Throughput">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
          <XAxis type="number" stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="label" stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} width={70} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#FFD166" />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function MonthlySales({ data }: { data: ChartPoint[] }) {
  return (
    <ChartShell title="Monthly Sales">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="label" stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.42)" tickLine={false} axisLine={false} width={48} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="value" stroke="#FF4D6D" strokeWidth={3} dot={{ r: 4, fill: "#FF4D6D" }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
