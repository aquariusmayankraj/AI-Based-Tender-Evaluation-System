import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { TrendingUp, FileText, Users, IndianRupee } from "lucide-react";

const stats = [
  { label: "Total Tenders Published", value: "5,82,140", icon: FileText, tone: "text-primary bg-primary/10" },
  { label: "Active Bidders", value: "3,21,488", icon: Users, tone: "text-india-green bg-india-green/10" },
  { label: "Awards (FY 25-26)", value: "₹ 4.2 Lakh Cr", icon: IndianRupee, tone: "text-gov-gold bg-gov-gold/10" },
  { label: "AI Accuracy", value: "99.2%", icon: TrendingUp, tone: "text-success bg-success/15" },
];

const monthly = [
  { m: "Nov", v: 78 },
  { m: "Dec", v: 92 },
  { m: "Jan", v: 65 },
  { m: "Feb", v: 88 },
  { m: "Mar", v: 100 },
  { m: "Apr", v: 84 },
];

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "MIS Reports · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="MIS Reports — Government eProcurement">
        <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className={`rounded border border-portal-border p-3 ${s.tone}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold opacity-80">{s.label}</div>
                  <div className="text-xl font-bold tabular-nums text-foreground mt-1">
                    {s.value}
                  </div>
                </div>
                <s.icon className="h-7 w-7 opacity-70" />
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-portal-border">
          <h3 className="font-display font-bold text-navy text-sm mb-3">
            Monthly Tender Volume (relative)
          </h3>
          <div className="flex items-end gap-2 h-40">
            {monthly.map((m) => (
              <div key={m.m} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[10px] font-semibold text-navy">{m.v}</div>
                <div
                  className="w-full bg-gradient-hero rounded-t"
                  style={{ height: `${m.v}%` }}
                />
                <div className="text-[10px] text-muted-foreground">{m.m}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </PortalLayout>
  ),
});
