"use client";

import { AlertTriangle } from "./icons";
import { motion } from "framer-motion";
import { formatDurationFrom } from "../lib/time";
import type { QueueOrder } from "../lib/types";
import { StatusBadge } from "./StatusBadge";

export function QueueTable({ orders, compact = false }: { orders: QueueOrder[]; compact?: boolean }) {
  const visibleOrders = compact ? orders.slice(0, 6) : orders;

  return (
    <section className="glass-panel overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="text-xl font-black text-white">Live Production Queue</h2>
          <p className="text-sm text-white/46">Waiting, printing, completed, rush, and ETA visibility</p>
        </div>
        <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-sm font-bold text-cyan">{orders.length} jobs</span>
      </div>

      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-white/[0.035] text-left text-xs uppercase tracking-[0.16em] text-white/42">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Waiting</th>
              <th className="px-5 py-3">Rush</th>
              <th className="px-5 py-3">ETA</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => (
              <motion.tr
                key={order.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-line text-sm text-white/86"
              >
                <td className="px-5 py-4 font-black text-white">{order.orderNumber}</td>
                <td className="truncate px-5 py-4">{order.customerName}</td>
                <td className="truncate px-5 py-4 text-white/62">{order.orderType}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4 font-bold tabular-nums text-amber">{formatDurationFrom(order.createdAt)}</td>
                <td className="px-5 py-4">
                  {order.rush ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-danger/40 bg-danger/15 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-danger shadow-danger-glow">
                      <AlertTriangle size={14} /> Rush
                    </span>
                  ) : (
                    <span className="text-white/30">Standard</span>
                  )}
                </td>
                <td className="px-5 py-4 font-semibold tabular-nums text-white/76">
                  {new Date(order.estimatedCompletion).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
