"use client";

import type { ReactNode } from "react";

import {
  Gauge,
  Target,
  Trophy
} from "./icons";

import type { DashboardPayload } from "../lib/types";

import { AnimatedNumber } from "./AnimatedNumber";

export function GoalPanel({
  data
}: {
  data: DashboardPayload;
}) {
  const revenueProgress = Math.min(
    100,
    Math.round(
      (data.kpis.revenueToday /
        data.settings.dailyRevenueGoal) *
        100
    )
  );

  const orderProgress = Math.min(
    100,
    Math.round(
      (data.kpis.ordersToday /
        data.settings.dailyOrderGoal) *
        100
    )
  );

  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <Target className="text-lime" />

        <h2 className="text-xl font-black">
          Daily Goal Tracker
        </h2>
      </div>

      <MetricBar
        label="Revenue"
        value={revenueProgress}
        amount={
          <AnimatedNumber
            value={data.kpis.revenueToday}
            currency
          />
        }
      />

      <MetricBar
        label="Orders"
        value={orderProgress}
        amount={
          <AnimatedNumber
            value={data.kpis.ordersToday}
          />
        }
      />

      <div className="mt-6">
        <p className="text-5xl font-black text-white">
          {data.completionPercentage}%
        </p>

        <p className="text-sm uppercase tracking-[0.18em] text-white/42">
          production completion
        </p>
      </div>
    </section>
  );
}

export function PrinterPanel({
  data
}: {
  data: DashboardPayload;
}) {
  const printers =
    data.printerUtilization?.length
      ? data.printerUtilization
      : [
          {
            name: "Epson F2270",
            utilization: Math.min(
              100,
              data.kpis.ordersInQueue * 8
            ),
            activeJob: `${data.kpis.ordersInQueue} active`
          },
          {
            name: "Prestige XL2",
            utilization: Math.min(
              100,
              data.kpis.ordersInQueue * 6
            ),
            activeJob: "Production"
          },
          {
            name: "DTF Station",
            utilization: Math.min(
              100,
              data.kpis.ordersInQueue * 5
            ),
            activeJob: "Queue Ready"
          }
        ];

  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <Gauge className="text-cyan" />

        <h2 className="text-xl font-black">
          Printer Utilization
        </h2>
      </div>

      <div className="space-y-4">
        {printers.map((printer) => (
          <MetricBar
            key={printer.name}
            label={printer.name}
            value={printer.utilization}
            amount={printer.activeJob}
          />
        ))}
      </div>
    </section>
  );
}

export function TopProductsPanel({
  data
}: {
  data: any;
}) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <h2 className="mb-5 text-2xl font-black text-white">
        Top Selling Products
      </h2>

      <div className="space-y-4">
        {data.topProducts?.length ? (
          data.topProducts.map(
            (
              product: any,
              index: number
            ) => (
              <div
                key={product.name}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="font-bold text-white">
                    #{index + 1}{" "}
                    {product.name}
                  </p>

                  <p className="text-sm text-white/60">
                    {product.quantity} sold
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-black text-lime">
                    $
                    {Number(
                      product.revenue
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-white/50">
            No product sales yet.
          </p>
        )}
      </div>
    </section>
  );
}

function MetricBar({
  label,
  value,
  amount
}: {
  label: string;
  value: number;
  amount: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-bold text-white/76">
          {label}
        </span>

        <span className="font-black text-white">
          {amount}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan via-lime to-amber transition-all duration-700"
          style={{
            width: `${Math.min(
              100,
              value
            )}%`
          }}
        />
      </div>
    </div>
  );
}
