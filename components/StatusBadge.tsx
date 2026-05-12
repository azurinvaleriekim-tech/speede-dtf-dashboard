import type { BusinessStatus, OrderStatus } from "../lib/types";

const statusClasses: Record<BusinessStatus | OrderStatus, string> = {
  OPEN: "border-lime/40 bg-lime/15 text-lime shadow-[0_0_26px_rgba(184,255,92,0.18)]",
  "CUT OFF CLOSED": "border-amber/40 bg-amber/15 text-amber",
  "AFTER HOURS": "border-danger/40 bg-danger/15 text-danger",
  Waiting: "border-amber/40 bg-amber/15 text-amber",
  Printing: "border-cyan/40 bg-cyan/15 text-cyan",
  Completed: "border-lime/40 bg-lime/15 text-lime"
};

export function StatusBadge({ status }: { status: BusinessStatus | OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${statusClasses[status]}`}>
      {status}
    </span>
  );
}
