"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Boxes, CheckCircle2, Clock3, Flame, PackageCheck, ShoppingCart } from "./icons";
import { useDashboard } from "./useDashboard";
import { HeaderBar } from "./HeaderBar";
import { KpiCard } from "./KpiCard";
import { QueueTable } from "./QueueTable";
import { MonthlySales, OrdersPerHour, RevenueTrend, ThroughputChart } from "./Charts";
import {
  GoalPanel,
  PrinterPanel,
  TopProductsPanel
} from "./OperationsPanels";
import { Ticker } from "./Ticker";

export function TvDashboard() {
  const { data } = useDashboard(60);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPage((current) => (current + 1) % 3), 30000);
    return () => clearInterval(timer);
  }, []);

  const content = useMemo(() => {
    if (!data) return null;

    const pages = [
      <section key="kpis" className="grid flex-1 grid-cols-4 gap-5">
        <KpiCard title="Orders Today" value={data.kpis.ordersToday} icon={ShoppingCart} detail="all channels synced" />
        <KpiCard title="Orders This Month" value={data.kpis.ordersThisMonth} icon={Boxes} accent="lime" detail="month-to-date volume" />
        <KpiCard title="Revenue Today" value={data.kpis.revenueToday} icon={Banknote} currency detail="gross production revenue" />
        <KpiCard title="Revenue This Month" value={data.kpis.revenueThisMonth} icon={Activity} currency accent="lime" detail="tracked across stores" />
        <KpiCard title="Average Order Value" value={data.kpis.averageOrderValue} icon={PackageCheck} currency accent="amber" detail="today's blended AOV" />
        <KpiCard title="Orders In Queue" value={data.kpis.ordersInQueue} icon={Clock3} accent="amber" detail="waiting or printing" />
        <KpiCard title="Rush Pending" value={data.kpis.rushOrdersPending} icon={Flame} accent="danger" detail="requires priority handling" />
        <KpiCard title="Completed Today" value={data.kpis.ordersCompletedToday} icon={CheckCircle2} accent="lime" detail="closed production jobs" />
      </section>,
      <section key="queue" className="grid flex-1 grid-cols-[1.7fr_0.9fr] gap-5">
        <QueueTable orders={data.queue} compact />
        <div className="grid gap-5">
          <GoalPanel data={data} />
          <PrinterPanel data={data} />
        </div>
      </section>,
      <section key="charts" className="grid flex-1 grid-cols-2 gap-5">
        <RevenueTrend data={data.charts.revenueToday} />
        <OrdersPerHour data={data.charts.ordersPerHour} />
        <ThroughputChart data={data.charts.throughput} />
        <MonthlySales data={data.charts.monthlySales} />
        <TopProductsPanel data={data} />
        <LeaderboardPanel data={data} />
      </section>
    ];

    return pages[page];
  }, [data, page]);

  if (!data) {
    return <main className="grid h-screen place-items-center bg-ink text-white">Loading TV control center...</main>;
  }

  return (
    <main className="relative h-screen overflow-hidden bg-ink p-6 text-white">
      <div className="grid-glow pointer-events-none absolute inset-0 opacity-80" />
      <motion.div
        animate={{ x: [0, 10, -6, 0], y: [0, -8, 4, 0] }}
        transition={{ duration: 90, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mx-auto flex h-full max-w-[1920px] flex-col gap-5"
      >
        <HeaderBar status={data.status} countdownSeconds={data.countdownSeconds} cutoffTime={data.settings.cutoffTime} generatedAt={data.generatedAt} />
        <Ticker items={data.ticker} />
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.55 }}
            className="flex min-h-0 flex-1"
          >
            {content}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((item) => (
            <span key={item} className={`h-1.5 w-16 rounded-full transition-colors ${item === page ? "bg-cyan" : "bg-white/14"}`} />
          ))}
        </div>
      </motion.div>
    </main>
  );
}
