import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { Ban } from "lucide-react";

const list = [
  { name: "XYZ Constructions Pvt. Ltd.", reason: "Submission of false documents", till: "31-Dec-2027" },
  { name: "ABC Suppliers", reason: "Non-performance of contract", till: "15-Jun-2026" },
  { name: "Quick Build Infra", reason: "Sub-standard material supply", till: "20-Aug-2026" },
  { name: "Metro Tech Services", reason: "Repeated bid violations", till: "01-Jan-2028" },
];

export const Route = createFileRoute("/debarment")({
  head: () => ({ meta: [{ title: "Debarment List · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="Debarment / Holiday List">
        <table className="w-full text-xs">
          <thead className="bg-portal-strip text-navy text-left">
            <tr>
              <th className="px-3 py-2 font-bold">#</th>
              <th className="px-3 py-2 font-bold">Bidder Name</th>
              <th className="px-3 py-2 font-bold">Reason</th>
              <th className="px-3 py-2 font-bold">Debarred Till</th>
              <th className="px-3 py-2 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-portal-border">
            {list.map((d, i) => (
              <tr key={d.name} className={i % 2 ? "bg-portal-bg/40" : ""}>
                <td className="px-3 py-2.5">{i + 1}</td>
                <td className="px-3 py-2.5 font-semibold text-navy">{d.name}</td>
                <td className="px-3 py-2.5">{d.reason}</td>
                <td className="px-3 py-2.5">{d.till}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/15 text-destructive border border-destructive/30 text-[11px] font-bold">
                    <Ban className="h-3 w-3" /> Debarred
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </PortalLayout>
  ),
});
