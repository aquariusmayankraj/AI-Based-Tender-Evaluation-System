import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Download,
  Sparkles,
  Check,
  X as XIcon,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { EvaluationResult } from "@/lib/api";

interface Props {
  result: EvaluationResult;
}

const statusConfig = {
  eligible: {
    label: "ELIGIBLE",
    Icon: CheckCircle2,
    bar: "bg-success",
    chip: "bg-success/15 text-success border-success/40",
    glow: "shadow-[0_0_40px_oklch(0.6_0.16_145/0.3)]",
    desc: "Bidder satisfies all mandatory criteria.",
  },
  not_eligible: {
    label: "NOT ELIGIBLE",
    Icon: XCircle,
    bar: "bg-destructive",
    chip: "bg-destructive/15 text-destructive border-destructive/40",
    glow: "shadow-[0_0_40px_oklch(0.58_0.22_27/0.3)]",
    desc: "One or more mandatory criteria failed.",
  },
  review: {
    label: "MANUAL REVIEW",
    Icon: AlertTriangle,
    bar: "bg-warning",
    chip: "bg-warning/25 text-warning-foreground border-warning/50",
    glow: "shadow-[0_0_40px_oklch(0.75_0.15_75/0.3)]",
    desc: "AI flagged items for officer review.",
  },
};

export function ResultSection({ result }: Props) {
  const cfg = statusConfig[result.status];
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setProgress(result.confidence), 100);
    return () => clearTimeout(t);
  }, [result.confidence]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      {/* Status + confidence */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div
          className={`lg:col-span-1 bg-card rounded-lg border border-border p-6 flex flex-col items-center text-center ${cfg.glow}`}
        >
          <cfg.Icon className={`h-14 w-14 mb-3 ${cfg.chip.split(" ")[1]}`} />
          <div className={`px-4 py-1.5 rounded-full border font-bold text-sm tracking-wider ${cfg.chip}`}>
            {cfg.label}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{cfg.desc}</p>
          {result.bidderName && (
            <div className="mt-4 pt-4 border-t border-border w-full">
              <div className="text-xs text-muted-foreground">Bidder</div>
              <div className="font-semibold text-foreground">{result.bidderName}</div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground">AI Confidence Score</h3>
            </div>
            <span className="text-2xl font-bold text-primary tabular-nums">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-full ${cfg.bar} relative`}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5 text-center">
            <Stat label="Criteria Passed" value={result.criteria.filter((c) => c.status === "pass").length} tone="success" />
            <Stat label="Need Review" value={result.criteria.filter((c) => c.status === "review").length} tone="warning" />
            <Stat label="Failed" value={result.criteria.filter((c) => c.status === "fail").length} tone="destructive" />
          </div>
        </div>
      </div>

      {/* Criteria table */}
      <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
        <div className="px-5 py-3 bg-navy text-white flex items-center justify-between">
          <h3 className="font-semibold text-sm">Eligibility Criteria Matrix</h3>
          <span className="text-xs opacity-80">{result.criteria.length} parameters evaluated</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/70 text-foreground">
              <tr className="text-left">
                <th className="px-4 py-2.5 font-semibold">Criterion</th>
                <th className="px-4 py-2.5 font-semibold">Required Value</th>
                <th className="px-4 py-2.5 font-semibold">Bidder Value</th>
                <th className="px-4 py-2.5 font-semibold text-center">Status</th>
                <th className="px-4 py-2.5 font-semibold">AI Reasoning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {result.criteria.map((c, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-accent/40"
                >
                  <td className="px-4 py-3 font-medium text-foreground">{c.criterion}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.required}</td>
                  <td className="px-4 py-3 text-foreground">{c.bidder}</td>
                  <td className="px-4 py-3 text-center">
                    <StatusPill status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.reason}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full px-5 py-3 flex items-center justify-between bg-gradient-hero text-white"
        >
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="font-semibold text-sm">AI Explanation & Reasoning</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-5 text-sm text-foreground leading-relaxed">
                <p>{result.explanation}</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-md bg-secondary/50 border border-border">
                    <div className="font-semibold text-foreground mb-1">Model</div>
                    <div className="text-muted-foreground font-mono">tender-eval-v2.4 · 2026-04</div>
                  </div>
                  <div className="p-3 rounded-md bg-secondary/50 border border-border">
                    <div className="font-semibold text-foreground mb-1">Compliance</div>
                    <div className="text-muted-foreground">GFR 2017 · CVC Guidelines · IT Act 2000</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download */}
      <div className="flex flex-wrap gap-3 justify-end">
        <button className="px-4 py-2.5 rounded-md border border-border bg-card text-sm font-semibold hover:bg-accent transition">
          Re-evaluate
        </button>
        <button
          onClick={() => {
            const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "tender-evaluation-report.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold shadow-card hover:shadow-elevated transition"
        >
          <Download className="h-4 w-4" />
          Download Report (PDF)
        </button>
      </div>
    </motion.section>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "success" | "warning" | "destructive" }) {
  const colors = {
    success: "text-success bg-success/10 border-success/30",
    warning: "text-warning-foreground bg-warning/20 border-warning/40",
    destructive: "text-destructive bg-destructive/10 border-destructive/30",
  };
  return (
    <div className={`rounded-md border p-3 ${colors[tone]}`}>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-xs font-medium opacity-90">{label}</div>
    </div>
  );
}

function StatusPill({ status }: { status: "pass" | "fail" | "review" }) {
  if (status === "pass")
    return (
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-success/15 text-success border border-success/40">
        <Check className="h-4 w-4" />
      </span>
    );
  if (status === "fail")
    return (
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-destructive/15 text-destructive border border-destructive/40">
        <XIcon className="h-4 w-4" />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-warning/25 text-warning-foreground border border-warning/50">
      <AlertTriangle className="h-3.5 w-3.5" />
    </span>
  );
}
