import { FileStack, ShieldCheck, Clock, TrendingUp } from "lucide-react";

const stats = [
  { label: "Active Tenders", value: "1,284", icon: FileStack, tone: "primary" },
  { label: "Evaluations Today", value: "342", icon: ShieldCheck, tone: "success" },
  { label: "Avg. Eval Time", value: "8.2s", icon: Clock, tone: "navy" },
  { label: "Accuracy", value: "99.2%", icon: TrendingUp, tone: "warning" },
];

const toneMap: Record<string, string> = {
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-success/15 to-success/5 text-success",
  navy: "from-navy/15 to-navy/5 text-navy",
  warning: "from-warning/25 to-warning/10 text-warning-foreground",
};

export function StatBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-lg border border-border bg-gradient-to-br ${toneMap[s.tone]} p-4 shadow-card`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium opacity-80">{s.label}</div>
              <div className="text-2xl font-bold mt-0.5 tabular-nums text-foreground">
                {s.value}
              </div>
            </div>
            <s.icon className="h-8 w-8 opacity-70" />
          </div>
        </div>
      ))}
    </div>
  );
}
