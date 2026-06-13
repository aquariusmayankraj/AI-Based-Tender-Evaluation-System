import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { Megaphone } from "lucide-react";

const items = [
  { date: "26-Apr-2026", title: "AI Evaluation Engine v2.4 deployed across all ministries", body: "Improved accuracy (99.2%), faster turnaround under 10 seconds, and explainable reasoning." },
  { date: "20-Apr-2026", title: "Scheduled maintenance — 02:00 to 04:00 IST", body: "The portal will be unavailable for 2 hours for security patching on Sunday." },
  { date: "12-Apr-2026", title: "Updated GFR 2017 compliance rules now active", body: "All new tenders will be auto-checked against revised GFR clauses 144 to 161." },
  { date: "01-Apr-2026", title: "12,480 evaluations completed in March 2026", body: "Across 38 ministries with average evaluation time of 8.2 seconds." },
];

export const Route = createFileRoute("/announcements")({
  head: () => ({ meta: [{ title: "Announcements · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="Announcements">
        <ul className="divide-y divide-portal-border">
          {items.map((it) => (
            <li key={it.title} className="p-4 flex gap-3 hover:bg-portal-strip/40 transition">
              <div className="h-9 w-9 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Megaphone className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {it.date}
                </div>
                <div className="font-display font-bold text-navy">{it.title}</div>
                <p className="text-sm text-foreground mt-1">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </PortalLayout>
  ),
});
