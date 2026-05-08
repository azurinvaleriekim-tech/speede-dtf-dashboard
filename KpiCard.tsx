"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";

type KpiCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  currency?: boolean;
  suffix?: string;
  accent?: "cyan" | "lime" | "amber" | "danger";
  detail: string;
};

const accents = {
  cyan: "from-cyan/24 text-cyan",
  lime: "from-lime/22 text-lime",
  amber: "from-amber/22 text-amber",
  danger: "from-danger/24 text-danger"
};

export function KpiCard({ title, value, icon: Icon, currency, suffix, accent = "cyan", detail }: KpiCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel relative overflow-hidden rounded-lg p-5"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[accent]} to-transparent`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/48">{title}</p>
          <div className="mt-3 text-4xl font-black leading-none text-white xl:text-5xl">
            <AnimatedNumber value={value} currency={currency} suffix={suffix} />
          </div>
        </div>
        <div className={`rounded-lg border border-white/10 bg-white/5 p-3 ${accents[accent].split(" ").at(-1)}`}>
          <Icon size={26} strokeWidth={2.2} />
        </div>
      </div>
      <p className="mt-4 text-sm text-white/54">{detail}</p>
    </motion.article>
  );
}
