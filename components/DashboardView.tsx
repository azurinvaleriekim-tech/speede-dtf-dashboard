"use client";

import { Activity, Banknote, Boxes, CheckCircle2, Clock3, Flame, PackageCheck, Printer, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { HeaderBar } from "./HeaderBar";
import { KpiCard } from "./KpiCard";
import { MonthlySales, OrdersPerHour, RevenueTrend, ThroughputChart } from "./Charts";
import { QueueTable } from "./QueueTable";
import { GoalPanel, LeaderboardPanel, PrinterPanel, TopProductsPanel } from "./OperationsPanels";
import { Ticker } from "./Ticker";
import { useDashboard } from "../lib/useDashboard";

export function DashboardView({ tv = false }: { tv?: boolean }) {
  const { data, error } = useDashboard(60);

  if (error) {
    return <main className="grid min-h-screen place-items-center bg-ink text-danger">Dashboard feed unavailable.</main>;
  }

  if (!data) {
    return <main className="grid min-h-screen place-items-center bg-ink text-white">Loading production control...</main>;
  }

  return (
    <main className={`relative min-h-screen overflow-hidden p-4 text-white md:p-6 ${tv ? "h-screen" : ""}`}>
      <div className="grid-glow pointer-events-none absolute inset-0 opacity-80" />
      <motion.div className="pointer-events-none absolute inset-0 animate-drift bg-[radial-gradient(circle_at_50%_50%,rgba(55,215,255,0.08),transparent_42%)]" />
      <div className="relative z-10 mx-auto flex max-w-[1920px] flex-col gap-5">
        <HeaderBar status={data.status} countdownSeconds={data.countdownSeconds} cutoffTime={data.settings.cutoffTime} generatedAt={data.generatedAt} />
        <Ticker items={data.ticker} />

        <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <KpiCard title="Orders Today" value={data.kpis.ordersToday} icon={ShoppingCart} detail="all channels synced" />
          <KpiCard title="Orders This Month" value={data.kpis.ordersThisMonth} icon={Boxes} accent="lime" detail="month-to-date volume" />
          <KpiCard title="Revenue Today" value={data.kpis.revenueToday} icon={Banknote} currency accent="cyan" detail="gross production revenue" />
          <KpiCard title="Revenue This Month" value={data.kpis.revenueThisMonth} icon={Activity} currency accent="lime" detail="tracked across stores" />
          <KpiCard title="Average Order Value" value={data.kpis.averageOrderValue} icon={PackageCheck} currency accent="amber" detail="today's blended AOV" />
          <KpiCard title="Avg Turnaround" value={data.kpis.averageTurnaroundMinutes} icon={Clock3} suffix="m" accent="cyan" detail="completed today" />
          <KpiCard title="Orders In Queue" value={data.kpis.ordersInQueue} icon={Clock3} accent="amber" detail="waiting or printing" />
          <KpiCard title="Processing" value={data.kpis.processingOrders} icon={Printer} accent="cyan" detail="actively in production" />
          <KpiCard title="Rush Pending" value={data.kpis.rushOrdersPending} icon={Flame} accent="danger" detail="requires priority handling" />
          <KpiCard title="Completed Today" value={data.kpis.ordersCompletedToday} icon={CheckCircle2} accent="lime" detail="closed production jobs" />
        </section>

        <div className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
          <QueueTable orders={data.queue} compact={tv} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            <GoalPanel data={data} />
            <PrinterPanel data={data} />
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          <RevenueTrend data={data.charts.revenueToday} />
          <OrdersPerHour data={data.charts.ordersPerHour} />
          <ThroughputChart data={data.charts.throughput} />
          <MonthlySales data={data.charts.monthlySales} />
        </section>

        <AnimatePresence>
          {!tv && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid gap-5 lg:grid-cols-2"
            >
              <TopProductsPanel data={data} />
              <LeaderboardPanel data={data} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
