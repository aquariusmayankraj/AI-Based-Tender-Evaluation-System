import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { tenderResults } from "@/lib/tenderData";
import { Award } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "Results of Tenders · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="Results of Tenders / Awards">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-portal-strip text-navy text-left">
              <tr>
                <th className="px-3 py-2 font-bold">#</th>
                <th className="px-3 py-2 font-bold">Tender Title</th>
                <th className="px-3 py-2 font-bold">Reference</th>
                <th className="px-3 py-2 font-bold">Awarded To</th>
                <th className="px-3 py-2 font-bold">Award Value</th>
                <th className="px-3 py-2 font-bold">Award Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-portal-border">
              {tenderResults.map((r, i) => (
                <tr key={r.ref} className={i % 2 ? "bg-portal-bg/40" : ""}>
                  <td className="px-3 py-2.5">{i + 1}</td>
                  <td className="px-3 py-2.5 text-primary font-medium">{r.title}</td>
                  <td className="px-3 py-2.5 font-mono">{r.ref}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-gov-gold" />
                      {r.awarded}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-semibold">{r.value}</td>
                  <td className="px-3 py-2.5">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PortalLayout>
  ),
});
