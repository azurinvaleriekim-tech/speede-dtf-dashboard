"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Barcode,
  Bell,
  Boxes,
  CheckCircle2,
  Clock3,
  DollarSign,
  Flame,
  PackageCheck,
  Printer,
  RadioTower,
  TrendingUp,
  Truck,
  Users
} from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { useOps } from "../lib/useOps";
import type { HeatmapPoint, PrinterAsset, ProductionOrder } from "../lib/enterprise-types";

const stageColor: Record<string, string> = {
  "Awaiting Artwork": "text-amber border-amber/40 bg-amber/12",
  "Ready to Print": "text-cyan border-cyan/40 bg-cyan/12",
  Printing: "text-cyan border-cyan/40 bg-cyan/12",
  Powdering: "text-lime border-lime/40 bg-lime/12",
  Curing: "text-lime border-lime/40 bg-lime/12",
  Cutting: "text-amber border-amber/40 bg-amber/12",
  Packing: "text-white border-white/20 bg-white/8",
  "Ready for Pickup": "text-lime border-lime/40 bg-lime/12",
  Shipped: "text-cyan border-cyan/40 bg-cyan/12",
  Completed: "text-lime border-lime/40 bg-lime/12"
};

export function OpsControlCenter() {
  const { data, error } = useOps(60);

  if (error) return <main className="grid min-h-screen place-items-center bg-ink text-danger">Operations feed unavailable.</main>;
  if (!data) return <main className="grid min-h-screen place-items-center bg-ink text-white">Loading print shop operating system...</main>;

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink p-5 text-white">
      <div className="grid-glow pointer-events-none fixed inset-0 opacity-80" />
      <div className="relative z-10 mx-auto max-w-[1920px] space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-cyan">Speede Transfers OS</p>
            <h1 className="mt-2 text-4xl font-black md:text-6xl">Production Control Center</h1>
          </div>
          <div className="glass-panel rounded-lg px-5 py-4 text-right">
            <p className="flex items-center justify-end gap-2 text-xs font-black uppercase tracking-[0.22em] text-lime">
              <RadioTower size={15} /> Live WooCommerce Sync
            </p>
            <p className="mt-2 text-sm text-white/50">Generated {new Date(data.generatedAt).toLocaleTimeString()}</p>
            <p className="text-xs text-white/36">WebSocket target {data.websocketUrl}</p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-4 xl:grid-cols-5">
          <OpsKpi title="Orders Today" value={data.kpis.ordersToday} icon={<Boxes />} />
          <OpsKpi title="Revenue Today" value={data.kpis.revenueToday} currency icon={<DollarSign />} />
          <OpsKpi title="Revenue Month" value={data.kpis.revenueThisMonth} currency icon={<TrendingUp />} />
          <OpsKpi title="Queue" value={data.kpis.ordersInQueue} icon={<Clock3 />} accent="amber" />
          <OpsKpi title="Rush" value={data.kpis.rushOrders} icon={<Flame />} accent="danger" />
          <OpsKpi title="Completed" value={data.kpis.ordersCompleted} icon={<CheckCircle2 />} accent="lime" />
          <OpsKpi title="Turnaround" value={data.kpis.averageTurnaroundMinutes} suffix="m" icon={<PackageCheck />} />
          <OpsKpi title="Pickups" value={data.kpis.pendingPickups} icon={<Truck />} accent="lime" />
          <OpsKpi title="Failed" value={data.kpis.failedOrders} icon={<AlertTriangle />} accent="danger" />
          <OpsKpi title="Reprints" value={data.kpis.reprintCount} icon={<Barcode />} accent="amber" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
          <ProductionQueue orders={data.queue} />
          <div className="grid gap-5">
            <DueSoon orders={data.dueSoon} />
            <ForecastCard forecast={data.forecast} completion={data.kpis.productionCompletionPercent} />
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          {data.printers.map((printer) => (
            <PrinterCard key={printer.id} printer={printer} />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <GangSheetPanel batches={data.gangSheets} />
          <EmployeePanel employees={data.employees} />
          <HeatmapPanel heatmap={data.heatmap} />
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <BottleneckPanel bottlenecks={data.bottlenecks} />
          <NotificationPanel notifications={data.notifications} />
        </section>
      </div>
    </main>
  );
}

function OpsKpi({
  title,
  value,
  icon,
  currency,
  suffix,
  accent = "cyan"
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  currency?: boolean;
  suffix?: string;
  accent?: "cyan" | "lime" | "amber" | "danger";
}) {
  const colors = {
    cyan: "text-cyan from-cyan/20",
    lime: "text-lime from-lime/20",
    amber: "text-amber from-amber/20",
    danger: "text-danger from-danger/20"
  };

  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">{title}</p>
        <span className={`rounded-lg border border-white/10 bg-gradient-to-br to-transparent p-2 ${colors[accent]}`}>{icon}</span>
      </div>
      <p className="mt-4 text-4xl font-black leading-none">
        <AnimatedNumber value={value} currency={currency} suffix={suffix} />
      </p>
    </motion.article>
  );
}

function ProductionQueue({ orders }: { orders: ProductionOrder[] }) {
  return (
    <section className="glass-panel overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="text-2xl font-black">Live Queue System</h2>
          <p className="text-sm text-white/42">Barcode, due-time, assignment, ETA, risk, and stage visibility</p>
        </div>
        <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-sm font-black text-cyan">{orders.length} active</span>
      </div>
      <div className="overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-white/[0.035] text-left text-xs uppercase tracking-[0.16em] text-white/42">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Sheet</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Printer</th>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Barcode</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={`border-t border-line ${order.atRisk ? "bg-danger/8" : ""}`}>
                <td className="px-4 py-3 font-black">{order.orderNumber}{order.rush ? <span className="ml-2 text-danger">RUSH</span> : null}</td>
                <td className="truncate px-4 py-3">{order.customer}</td>
                <td className="truncate px-4 py-3 text-white/62">{order.productType}</td>
                <td className="px-4 py-3 font-bold text-cyan">{order.gangSheetSize}</td>
                <td className="px-4 py-3 text-amber">{new Date(order.dueTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full border px-2 py-1 text-xs font-black ${stageColor[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-4 py-3">{order.assignedPrinter}</td>
                <td className="px-4 py-3">{order.assignedEmployee}</td>
                <td className="truncate px-4 py-3 font-mono text-xs text-white/50">{order.barcodeId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DueSoon({ orders }: { orders: ProductionOrder[] }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-4 text-xl font-black">Due In Next 2 Hours</h2>
      <div className="space-y-3">
        {orders.map((order) => {
          const minutes = Math.max(0, Math.round((new Date(order.dueTime).getTime() - Date.now()) / 60000));
          return (
            <div key={order.id} className={`rounded-lg border p-3 ${order.atRisk ? "border-danger/40 bg-danger/12" : "border-white/10 bg-white/[0.035]"}`}>
              <div className="flex items-center justify-between">
                <p className="font-black">{order.orderNumber}</p>
                <p className={`text-2xl font-black ${minutes < 45 ? "text-danger" : "text-amber"}`}>{minutes}m</p>
              </div>
              <p className="text-sm text-white/46">{order.customer} · {order.status}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ForecastCard({ forecast, completion }: { forecast: { busyHourPrediction: string; dailyVolumePrediction: number; materialUsageFeet: number; inkUsageMl: number; rushOrderProbability: number; staffingRecommendation: string }; completion: number }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="text-xl font-black">AI Production Forecasting</h2>
      <p className="mt-4 text-5xl font-black text-lime">{completion}%</p>
      <p className="text-sm uppercase tracking-[0.18em] text-white/42">completion forecast</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <ForecastMetric label="Busy hour" value={forecast.busyHourPrediction} />
        <ForecastMetric label="Daily volume" value={`${forecast.dailyVolumePrediction} orders`} />
        <ForecastMetric label="Material" value={`${forecast.materialUsageFeet} ft`} />
        <ForecastMetric label="Ink" value={`${forecast.inkUsageMl} ml`} />
      </div>
      <p className="mt-4 rounded-lg border border-cyan/20 bg-cyan/10 p-3 text-sm text-cyan">{forecast.staffingRecommendation}</p>
    </section>
  );
}

function ForecastMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.035] p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-white/36">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function PrinterCard({ printer }: { printer: PrinterAsset }) {
  const statusClass = printer.status === "Error" ? "text-danger" : printer.status === "Maintenance" ? "text-amber" : printer.status === "Printing" ? "text-cyan" : "text-lime";

  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black">{printer.name}</h2>
          <p className={`mt-1 font-black uppercase tracking-[0.16em] ${statusClass}`}>{printer.status}</p>
        </div>
        <Printer className={statusClass} />
      </div>
      <p className="mt-4 text-sm text-white/48">Current job <span className="font-black text-white">{printer.currentJob ?? "Idle"}</span></p>
      <p className="text-sm text-white/48">Finish {printer.estimatedFinish ? new Date(printer.estimatedFinish).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "n/a"}</p>
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-sm">
          <span>Utilization</span>
          <span className="font-black">{printer.utilization}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/8"><div className="h-full rounded-full bg-cyan" style={{ width: `${printer.utilization}%` }} /></div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs font-black">
        {Object.entries(printer.inkLevels).map(([key, value]) => (
          <div key={key} className="rounded-md bg-white/[0.035] p-2">
            <p className="uppercase text-white/40">{key}</p>
            <p className={value < 45 ? "text-danger" : "text-lime"}>{value}%</p>
          </div>
        ))}
      </div>
      {printer.maintenanceWarnings.length ? <p className="mt-4 rounded-lg border border-amber/30 bg-amber/10 p-3 text-sm text-amber">{printer.maintenanceWarnings.join(" · ")}</p> : null}
    </section>
  );
}

function GangSheetPanel({ batches }: { batches: Array<{ id: string; size: string; dueWindow: string; orderCount: number; rushCount: number; assignedPrinter: string; wastePercent: number; wasteReduction: number; sequence: string[]; completionPercent: number }> }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-4 text-xl font-black">Gang Sheet Queue</h2>
      <div className="space-y-4">
        {batches.map((batch) => (
          <div key={batch.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="flex justify-between">
              <p className="text-lg font-black">{batch.size}</p>
              <p className="font-black text-lime">{batch.completionPercent}%</p>
            </div>
            <p className="text-sm text-white/44">{batch.orderCount} orders · {batch.rushCount} rush · {batch.assignedPrinter}</p>
            <p className="mt-2 text-sm text-cyan">Waste reduced {batch.wasteReduction}% · current waste {batch.wastePercent}%</p>
            <p className="mt-2 truncate font-mono text-xs text-white/42">{batch.sequence.join(" -> ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmployeePanel({ employees }: { employees: Array<{ id: string; name: string; role: string; activeTask: string; completedToday: number; averageSpeedMinutes: number; errorRate: number }> }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Users className="text-lime" /> Employee Productivity</h2>
      <div className="space-y-3">
        {employees.map((employee) => (
          <div key={employee.id} className="flex items-center justify-between rounded-lg bg-white/[0.035] p-3">
            <div>
              <p className="font-black">{employee.name}</p>
              <p className="text-xs text-white/42">{employee.role} · {employee.activeTask}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-lime">{employee.completedToday}</p>
              <p className="text-xs text-white/42">{employee.errorRate}% reprint</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HeatmapPanel({ heatmap }: { heatmap: HeatmapPoint[] }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-4 text-xl font-black">Heatmap Analytics</h2>
      <div className="grid grid-cols-6 gap-2">
        {heatmap.map((point) => (
          <div
            key={`${point.day}-${point.hour}`}
            className="rounded-md p-2 text-center text-[11px] font-black"
            style={{ background: `rgba(55, 215, 255, ${Math.min(0.65, 0.08 + point.bottleneckScore / 120)})` }}
          >
            <p>{point.day}</p>
            <p className="text-white/52">{point.hour}</p>
            <p className="text-lime">{point.orders}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottleneckPanel({ bottlenecks }: { bottlenecks: Array<{ stage: string; severity: string; message: string; affectedOrders: number }> }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-4 text-xl font-black">Bottleneck Detection</h2>
      <div className="space-y-3">
        {bottlenecks.map((item) => (
          <div key={item.stage} className="rounded-lg border border-danger/25 bg-danger/10 p-4">
            <p className="font-black text-danger">{item.stage} · {item.severity.toUpperCase()}</p>
            <p className="mt-1 text-sm text-white/62">{item.message}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/36">{item.affectedOrders} affected orders</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotificationPanel({ notifications }: { notifications: Array<{ id: string; channel: string; recipient: string; type: string; status: string }> }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Bell className="text-cyan" /> SMS + Email Notifications</h2>
      <div className="space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg bg-white/[0.035] p-3">
            <div>
              <p className="font-black uppercase">{item.type.replaceAll("_", " ")}</p>
              <p className="text-xs text-white/42">{item.channel} · {item.recipient}</p>
            </div>
            <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2 py-1 text-xs font-black text-cyan">{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
