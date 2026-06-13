import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { latestTenders } from "@/lib/tenderData";
import { Download, Sparkles, FileText, Calendar, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/tenders/$id")({
  loader: ({ params }) => {
    const t = latestTenders.find((x) => x.id === params.id);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.ref ?? "Tender"} · eProcurement` }],
  }),
  notFoundComponent: () => (
    <PortalLayout>
      <div className="bg-card p-8 rounded border border-portal-border text-center">
        <h2 className="font-display font-bold text-navy text-xl">Tender not found</h2>
        <Link to="/tenders" className="text-primary hover:underline text-sm">
          ← Back to all tenders
        </Link>
      </div>
    </PortalLayout>
  ),
  component: TenderDetail,
});

function TenderDetail() {
  const t = Route.useLoaderData();
  return (
    <PortalLayout>
      <div className="text-xs text-muted-foreground">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        ›{" "}
        <Link to="/tenders" className="hover:underline">
          Tenders
        </Link>{" "}
        › <span className="text-foreground font-semibold">{t.ref}</span>
      </div>

      <SectionCard title={`Tender Details — ${t.ref}`}>
        <div className="p-5 space-y-4">
          <h1 className="font-display text-lg font-bold text-navy">{t.title}</h1>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Info icon={<Building2 />} label="Organisation" value={t.org} />
            <Info icon={<MapPin />} label="Location" value={t.location} />
            <Info icon={<FileText />} label="Category" value={t.category} />
            <Info icon={<Calendar />} label="Closing Date" value={t.closing} />
            <Info icon={<Calendar />} label="Bid Opening" value={t.opening} />
            <Info icon={<FileText />} label="Estimated Value" value={t.value} />
          </div>

          <div className="border-t border-portal-border pt-3">
            <h3 className="font-semibold text-navy mb-2 text-sm">Scope of Work</h3>
            <p className="text-sm text-foreground leading-relaxed">
              The bidder is required to undertake all activities described in the tender notice in
              compliance with GFR 2017, CVC guidelines and applicable departmental codes. Detailed
              technical specifications, BOQ and eligibility criteria are available in the tender
              document for download below.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => toast.success("Tender document download started")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-navy text-white text-sm font-semibold hover:opacity-90 transition"
            >
              <Download className="h-4 w-4" />
              Download Tender Document
            </button>
            <Link
              to="/evaluation"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-gradient-hero text-white text-sm font-semibold shadow-glow hover:shadow-elevated transition"
            >
              <Sparkles className="h-4 w-4" />
              Evaluate with AI
            </Link>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Eligibility Criteria">
        <ul className="p-4 text-sm space-y-1.5 list-disc list-inside text-foreground">
          <li>Annual turnover ≥ 30% of estimated value (last 3 financial years).</li>
          <li>Minimum 5 years experience in similar works.</li>
          <li>Valid PAN, GST and ISO 9001 certification.</li>
          <li>EMD as per tender document — payable via DD/online.</li>
          <li>No debarment by any central/state government body.</li>
        </ul>
      </SectionCard>
    </PortalLayout>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2 p-2.5 rounded bg-portal-strip/40 border border-portal-border">
      <div className="text-primary [&>svg]:h-4 [&>svg]:w-4 mt-0.5">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {label}
        </div>
        <div className="text-foreground font-medium truncate">{value}</div>
      </div>
    </div>
  );
}
