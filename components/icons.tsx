"use client";

import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

export type LucideIcon = (props: IconProps) => JSX.Element;

function IconBase({ size = 24, strokeWidth = 2, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Activity: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M3 12h4l2-6 4 12 2-6h6" />
  </IconBase>
);

export const AlertTriangle: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </IconBase>
);

export const Banknote: LucideIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 9h.01M18 15h.01" />
  </IconBase>
);

export const Bell: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M6 9a6 6 0 0 1 12 0c0 7 3 6 3 8H3c0-2 3-1 3-8" />
    <path d="M10 21h4" />
  </IconBase>
);

export const Boxes: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="m7 8 5-3 5 3-5 3-5-3Z" />
    <path d="M7 8v6l5 3 5-3V8" />
    <path d="m3 12 4 2M21 12l-4 2" />
  </IconBase>
);

export const CheckCircle2: LucideIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </IconBase>
);

export const Clock: LucideIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </IconBase>
);

export const Clock3 = Clock;

export const Flame: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 .2 2-1 3-2 4 .2-3-1-6-4-8 .4 4-3 6-3 10 0 5 3 8 6 8Z" />
  </IconBase>
);

export const Gauge: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M4 15a8 8 0 1 1 16 0" />
    <path d="M12 15l4-5" />
    <path d="M12 19h.01" />
  </IconBase>
);

export const Monitor: LucideIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </IconBase>
);

export const PackageCheck: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="m4 8 8-4 8 4-8 4-8-4Z" />
    <path d="M4 8v8l8 4 8-4V8" />
    <path d="m9 15 2 2 4-5" />
  </IconBase>
);

export const RadioTower: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 14v7" />
    <path d="M8 21h8" />
    <path d="M7.5 10.5a6 6 0 0 1 9 0" />
    <path d="M4 7a11 11 0 0 1 16 0" />
    <path d="M12 11h.01" />
  </IconBase>
);

export const RefreshCcw: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M3 12a9 9 0 0 1 15-6l3 3" />
    <path d="M21 4v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6l-3-3" />
    <path d="M3 20v-5h5" />
  </IconBase>
);

export const Save: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M5 3h12l2 2v16H5V3Z" />
    <path d="M8 3v6h8V3" />
    <path d="M8 21v-7h8v7" />
  </IconBase>
);

export const ShoppingCart: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M3 3h2l2 12h11l2-8H6" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </IconBase>
);

export const SlidersHorizontal: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M3 6h10M17 6h4" />
    <path d="M3 12h4M11 12h10" />
    <path d="M3 18h12M19 18h2" />
    <circle cx="15" cy="6" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="17" cy="18" r="2" />
  </IconBase>
);

export const Target: LucideIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </IconBase>
);

export const Trophy: LucideIcon = (props) => (
  <IconBase {...props}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 6H4a3 3 0 0 0 3 5" />
    <path d="M16 6h4a3 3 0 0 1-3 5" />
    <path d="M12 13v5" />
    <path d="M8 21h8" />
  </IconBase>
);
