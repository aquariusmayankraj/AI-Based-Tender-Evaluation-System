import { Megaphone } from "lucide-react";

const notices = [
  "📢 New: AI evaluation engine v2.4 deployed with 99.2% accuracy.",
  "⚠ Scheduled maintenance window: 02:00–04:00 IST on Sunday.",
  "🔔 Tender ID GOI-2026-INFRA-0421 closes in 3 days.",
  "✅ 12,480 evaluations completed this month across 38 ministries.",
  "📄 Updated GFR 2017 compliance rules now active in evaluation matrix.",
];

export function NoticeTicker() {
  const text = notices.join("     •     ");
  return (
    <div className="flex items-stretch border-b border-border bg-warning/15">
      <div className="flex items-center gap-2 px-4 bg-warning text-warning-foreground font-semibold text-xs">
        <Megaphone className="h-4 w-4" />
        NOTICE
      </div>
      <div className="overflow-hidden flex-1 py-2">
        <div className="flex whitespace-nowrap animate-marquee text-sm text-foreground">
          <span className="px-8">{text}</span>
          <span className="px-8">{text}</span>
        </div>
      </div>
    </div>
  );
}
