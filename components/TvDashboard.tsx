"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Banknote,
  Boxes,
  CheckCircle2,
  Clock3,
  Flame,
  Maximize2,
  PackageCheck,
  Pause,
  Play,
  Printer,
  ShoppingCart,
  Volume2,
  VolumeX
} from "lucide-react";
import { useDashboard } from "./useDashboard";
import { HeaderBar } from "./HeaderBar";
import { KpiCard } from "./KpiCard";
import { QueueTable } from "./QueueTable";
import { MonthlySales, OrdersPerHour, RevenueTrend, ThroughputChart } from "./Charts";
import { GoalPanel, LeaderboardPanel, PrinterPanel, TopProductsPanel } from "./OperationsPanels";
import { Ticker } from "./Ticker";

export function TvDashboard() {
  const { data, mutate } = useDashboard(60);
  const [page, setPage] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioArmed, setAudioArmed] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [rushFlash, setRushFlash] = useState(false);
  const previousOrderIds = useRef<Set<string> | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (rotationPaused) return undefined;

    const timer = setInterval(() => setPage((current) => (current + 1) % 3), 30000);
    return () => clearInterval(timer);
  }, [rotationPaused]);

  const armAudio = useCallback(() => {
    if (audioArmed) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext.current = new AudioContextClass();
    setAudioArmed(true);
  }, [audioArmed]);

  const playNewOrderSound = useCallback(() => {
    if (!soundEnabled || !audioArmed || !audioContext.current) return;

    const context = audioContext.current;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(740, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(980, context.currentTime + 0.16);
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.28);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
  }, [audioArmed, soundEnabled]);

  const enterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.();
    armAudio();
  }, [armAudio]);

  useEffect(() => {
    let hideTimer: number;

    const showCursor = () => {
      setCursorHidden(false);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setCursorHidden(true), 2500);
    };

    showCursor();
    window.addEventListener("mousemove", showCursor);
    window.addEventListener("mousedown", armAudio);
    window.addEventListener("keydown", armAudio);

    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener("mousemove", showCursor);
      window.removeEventListener("mousedown", armAudio);
      window.removeEventListener("keydown", armAudio);
    };
  }, [armAudio]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === "f") enterFullscreen();
      if (key === " ") {
        event.preventDefault();
        setRotationPaused((current) => !current);
      }
      if (key === "arrowright") setPage((current) => (current + 1) % 3);
      if (key === "arrowleft") setPage((current) => (current + 2) % 3);
      if (key === "r") mutate();
      if (key === "m") setSoundEnabled((current) => !current);
      if (key === "h" || key === "?") setShowHelp((current) => !current);
      if (key === "escape") setShowHelp(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enterFullscreen, mutate]);

  useEffect(() => {
    if (!data) return;

    const currentIds = new Set(data.queue.map((order) => order.id));
    const previousIds = previousOrderIds.current;

    if (previousIds) {
      const hasNewOrder = data.queue.some((order) => !previousIds.has(order.id));
      if (hasNewOrder) playNewOrderSound();
    }

    previousOrderIds.current = currentIds;
  }, [data, playNewOrderSound]);

  useEffect(() => {
    if (!data?.kpis.rushOrdersPending) return undefined;

    setRushFlash(true);
    const timer = setTimeout(() => setRushFlash(false), 2800);
    return () => clearTimeout(timer);
  }, [data?.generatedAt, data?.kpis.rushOrdersPending]);

  const content = useMemo(() => {
    if (!data) return null;

    const pages = [
      <section key="kpis" className="grid flex-1 grid-cols-4 gap-5">
        <KpiCard title="Orders Today" value={data.kpis.ordersToday} icon={ShoppingCart} detail="all channels synced" />
        <KpiCard title="Orders This Month" value={data.kpis.ordersThisMonth} icon={Boxes} accent="lime" detail="month-to-date volume" />
        <KpiCard title="Revenue Today" value={data.kpis.revenueToday} icon={Banknote} currency detail="gross production revenue" />
        <KpiCard title="Revenue This Month" value={data.kpis.revenueThisMonth} icon={Activity} currency accent="lime" detail="tracked across stores" />
        <KpiCard title="Average Order Value" value={data.kpis.averageOrderValue} icon={PackageCheck} currency accent="amber" detail="today's blended AOV" />
        <KpiCard title="Avg Turnaround" value={data.kpis.averageTurnaroundMinutes} icon={Clock3} suffix="m" detail="completed today" />
        <KpiCard title="Orders In Queue" value={data.kpis.ordersInQueue} icon={Clock3} accent="amber" detail="waiting or printing" />
        <KpiCard title="Processing" value={data.kpis.processingOrders} icon={Printer} detail="actively in production" />
        <KpiCard title="Rush Pending" value={data.kpis.rushOrdersPending} icon={Flame} accent="danger" detail="requires priority handling" />
        <KpiCard title="Completed Today" value={data.kpis.ordersCompletedToday} icon={CheckCircle2} accent="lime" detail="closed production jobs" />
      </section>,
      <section key="queue" className="grid flex-1 grid-cols-[1.7fr_0.9fr] gap-5">
        <QueueTable orders={data.queue} compact autoScroll />
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
    <main
      onClick={armAudio}
      className={`relative h-screen overflow-hidden bg-ink p-6 text-white ${cursorHidden ? "cursor-none" : ""}`}
    >
      <div className="grid-glow pointer-events-none absolute inset-0 opacity-80" />
      <AnimatePresence>
        {rushFlash ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.36, 0.1, 0.32, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.7 }}
            className="pointer-events-none absolute inset-0 z-20 border-[18px] border-danger bg-danger/12"
          />
        ) : null}
      </AnimatePresence>
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
        <TvControls
          page={page}
          rotationPaused={rotationPaused}
          soundEnabled={soundEnabled}
          audioArmed={audioArmed}
          showHelp={showHelp}
          onFullscreen={enterFullscreen}
        />
      </motion.div>
    </main>
  );
}

function TvControls({
  page,
  rotationPaused,
  soundEnabled,
  audioArmed,
  showHelp,
  onFullscreen
}: {
  page: number;
  rotationPaused: boolean;
  soundEnabled: boolean;
  audioArmed: boolean;
  showHelp: boolean;
  onFullscreen: () => void;
}) {
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-30 flex flex-col items-end gap-3">
      <div className="glass-panel flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/56">
        <span className="flex items-center gap-1 text-cyan">{rotationPaused ? <Pause size={14} /> : <Play size={14} />} Page {page + 1}/3</span>
        <span className="flex items-center gap-1">{soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />} {audioArmed ? "Audio Ready" : "Click To Arm"}</span>
        <button
          type="button"
          onClick={onFullscreen}
          className="pointer-events-auto inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/70"
        >
          <Maximize2 size={14} /> Fullscreen
        </button>
      </div>
      {showHelp ? (
        <div className="glass-panel w-[360px] rounded-lg p-4 text-xs text-white/68">
          <p className="mb-3 font-black uppercase tracking-[0.18em] text-cyan">Keyboard Shortcuts</p>
          <div className="grid grid-cols-2 gap-2">
            <Shortcut keyName="F" label="Fullscreen" />
            <Shortcut keyName="Space" label="Pause rotation" />
            <Shortcut keyName="Left/Right" label="Change page" />
            <Shortcut keyName="R" label="Refresh now" />
            <Shortcut keyName="M" label="Mute sound" />
            <Shortcut keyName="H" label="Toggle help" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Shortcut({ keyName, label }: { keyName: string; label: string }) {
  return (
    <p className="flex items-center justify-between gap-3 rounded-md bg-white/[0.035] px-3 py-2">
      <span className="font-black text-white">{keyName}</span>
      <span>{label}</span>
    </p>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
