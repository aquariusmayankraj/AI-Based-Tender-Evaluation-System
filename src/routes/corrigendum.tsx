import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { latestCorrigendums } from "@/lib/tenderData";

export const Route = createFileRoute("/corrigendum")({
  head: () => ({ meta: [{ title: "Corrigendums · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="Latest Corrigendums">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-portal-strip text-navy text-left">
              <tr>
                <th className="px-3 py-2 font-bold">#</th>
                <th className="px-3 py-2 font-bold">Title</th>
                <th className="px-3 py-2 font-bold">Reference</th>
                <th className="px-3 py-2 font-bold">Closing</th>
                <th className="px-3 py-2 font-bold">Bid Opening</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-portal-border">
              {latestCorrigendums.map((c, i) => (
                <tr key={c.ref} className={i % 2 ? "bg-portal-bg/40" : ""}>
                  <td className="px-3 py-2.5">{i + 1}</td>
                  <td className="px-3 py-2.5 text-primary">{c.title}</td>
                  <td className="px-3 py-2.5 font-mono">{c.ref}</td>
                  <td className="px-3 py-2.5">{c.closing}</td>
                  <td className="px-3 py-2.5">{c.opening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PortalLayout>
  ),
});
