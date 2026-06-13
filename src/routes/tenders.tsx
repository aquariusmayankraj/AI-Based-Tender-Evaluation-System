import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { latestTenders } from "@/lib/tenderData";
import { useState, useMemo } from "react";
import { Filter, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tenders")({
  validateSearch: (s: Record<string, unknown>): { by?: string; sort?: string } => ({
    by: (s.by as string) || undefined,
    sort: (s.sort as string) || undefined,
  }),
  head: () => ({
    meta: [{ title: "Active Tenders · eProcurement Portal" }],
  }),
  component: TendersPage,
});

function TendersPage() {
  const { by, sort } = Route.useSearch();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [loc, setLoc] = useState("");

  const rows = useMemo(() => {
    let r = [...latestTenders];
    if (q) r = r.filter((t) => (t.title + t.ref + t.org).toLowerCase().includes(q.toLowerCase()));
    if (cat) r = r.filter((t) => t.category === cat);
    if (loc) r = r.filter((t) => t.location.toLowerCase().includes(loc.toLowerCase()));
    if (sort === "closing") r.sort((a, b) => a.closing.localeCompare(b.closing));
    return r;
  }, [q, cat, loc, sort]);

  const heading = by
    ? `Tenders · ${by[0].toUpperCase()}${by.slice(1)}`
    : sort === "closing"
    ? "Tenders by Closing Date"
    : "Active Tenders";

  return (
    <PortalLayout>
      <SectionCard title={heading}>
        <div className="p-3 grid sm:grid-cols-4 gap-2 bg-portal-strip/50 border-b border-portal-border">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title / ref / org"
            className="px-2 py-1.5 text-xs border border-portal-border rounded sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="px-2 py-1.5 text-xs border border-portal-border rounded bg-card"
          >
            <option value="">All categories</option>
            <option>Goods</option>
            <option>Works</option>
            <option>Services</option>
          </select>
          <input
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            placeholder="Location"
            className="px-2 py-1.5 text-xs border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-portal-strip text-navy">
              <tr className="text-left">
                <th className="px-3 py-2 font-bold">#</th>
                <th className="px-3 py-2 font-bold">Title</th>
                <th className="px-3 py-2 font-bold">Reference</th>
                <th className="px-3 py-2 font-bold">Organisation</th>
                <th className="px-3 py-2 font-bold">Closing</th>
                <th className="px-3 py-2 font-bold">Value</th>
                <th className="px-3 py-2 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-portal-border">
              {rows.map((t, i) => (
                <tr key={t.id} className={i % 2 ? "bg-portal-bg/40" : ""}>
                  <td className="px-3 py-2.5">{i + 1}</td>
                  <td className="px-3 py-2.5 max-w-md">
                    <Link
                      to="/tenders/$id"
                      params={{ id: t.id }}
                      className="text-primary hover:underline font-medium"
                    >
                      {t.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 font-mono whitespace-nowrap">{t.ref}</td>
                  <td className="px-3 py-2.5">{t.org}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">{t.closing}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap font-semibold">{t.value}</td>
                  <td className="px-3 py-2.5">
                    <Link
                      to="/tenders/$id"
                      params={{ id: t.id }}
                      className="px-2 py-1 rounded bg-navy text-white text-[11px] hover:opacity-90"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                    <Filter className="h-5 w-5 mx-auto mb-2 opacity-60" />
                    No tenders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
      <Link
        to="/evaluation"
        className="block bg-gradient-hero text-white rounded p-3 text-sm font-bold text-center shadow-card hover:shadow-elevated transition"
      >
        <Sparkles className="h-4 w-4 inline mr-1" />
        Evaluate any of these tenders with AI →
      </Link>
    </PortalLayout>
  );
}
