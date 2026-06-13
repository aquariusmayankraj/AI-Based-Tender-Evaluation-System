import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { latestTenders } from "@/lib/tenderData";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({ q: (s.q as string) || undefined }),
  head: () => ({ meta: [{ title: "Advanced Tender Search · eProcurement" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const [org, setOrg] = useState("");
  const [val, setVal] = useState("");

  const results = useMemo(
    () =>
      latestTenders.filter(
        (t) =>
          (!q || (t.title + t.ref + t.org).toLowerCase().includes(q.toLowerCase())) &&
          (!org || t.org.toLowerCase().includes(org.toLowerCase())) &&
          (!val || t.value.includes(val))
      ),
    [q, org, val]
  );

  return (
    <PortalLayout>
      <SectionCard title="Advanced Tender Search">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-4 grid sm:grid-cols-3 gap-3 bg-portal-strip/40 border-b border-portal-border"
        >
          <Input label="Tender ID / Title / Reference" value={q} onChange={setQ} />
          <Input label="Organisation" value={org} onChange={setOrg} />
          <Input label="Value contains" value={val} onChange={setVal} placeholder="e.g. 50,00,000" />
          <button
            type="submit"
            className="sm:col-span-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-navy text-white text-sm font-semibold hover:opacity-90"
          >
            <Search className="h-4 w-4" />
            Search ({results.length})
          </button>
        </form>
        <div className="divide-y divide-portal-border">
          {results.map((t) => (
            <div key={t.id} className="p-4 hover:bg-portal-strip/40 transition">
              <div className="text-primary font-semibold text-sm">{t.title}</div>
              <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-4">
                <span>Ref: {t.ref}</span>
                <span>{t.org}</span>
                <span>Closes: {t.closing}</span>
                <span className="font-semibold">{t.value}</span>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No results found.</div>
          )}
        </div>
      </SectionCard>
    </PortalLayout>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="text-xs">
      <div className="font-semibold text-navy mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-2 py-1.5 border border-portal-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
