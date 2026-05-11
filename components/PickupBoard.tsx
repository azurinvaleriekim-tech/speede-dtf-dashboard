"use client";

import { motion } from "framer-motion";
import { QrCode, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useOps } from "../lib/useOps";

export function PickupBoard() {
  const { data } = useOps(60);
  const [query, setQuery] = useState("");

  const readyOrders = useMemo(() => {
    const orders = data?.queue.filter((order) => ["Ready for Pickup", "Packing", "Completed"].includes(order.status) || order.pickupMethod === "pickup") ?? [];
    if (!query.trim()) return orders;
    return orders.filter((order) => `${order.orderNumber} ${order.customer}`.toLowerCase().includes(query.toLowerCase()));
  }, [data?.queue, query]);

  return (
    <main className="relative grid min-h-screen bg-ink p-6 text-white">
      <div className="grid-glow pointer-events-none fixed inset-0 opacity-70" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-lime">Customer Pickup</p>
            <h1 className="mt-2 text-5xl font-black md:text-7xl">Order Status Board</h1>
          </div>
          <div className="glass-panel flex items-center gap-3 rounded-lg px-4 py-3">
            <Search className="text-cyan" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search order or name"
              className="w-64 bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/30"
            />
          </div>
        </header>

        <section className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {readyOrders.map((order) => (
            <motion.article
              key={order.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-black">{order.orderNumber}</p>
                  <p className="mt-2 text-xl font-bold text-white/72">{order.customer}</p>
                </div>
                <QrCode className="text-cyan" size={42} />
              </div>
              <p className="mt-8 rounded-lg border border-lime/30 bg-lime/10 px-4 py-3 text-center text-2xl font-black text-lime">{order.status}</p>
              <p className="mt-4 text-center text-sm uppercase tracking-[0.2em] text-white/38">{order.barcodeId}</p>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
