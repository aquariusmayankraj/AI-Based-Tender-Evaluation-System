import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

const items = [
  { name: "Bidders Manual Kit (PDF)", size: "2.4 MB" },
  { name: "DSC Installation Guide (PDF)", size: "1.1 MB" },
  { name: "GFR 2017 Compliance Checklist", size: "640 KB" },
  { name: "Tender Document Template (DOC)", size: "320 KB" },
  { name: "Browser Compatibility Setup", size: "180 KB" },
  { name: "Java Setup for DSC Signing", size: "5.8 MB" },
];

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [{ title: "Downloads · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="Downloads">
        <ul className="divide-y divide-portal-border">
          {items.map((it) => (
            <li
              key={it.name}
              className="flex items-center gap-3 px-4 py-3 hover:bg-portal-strip/40 transition"
            >
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{it.name}</div>
                <div className="text-xs text-muted-foreground">{it.size}</div>
              </div>
              <button
                onClick={() => toast.success(`Downloading ${it.name}...`)}
                className="px-3 py-1.5 rounded bg-navy text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:opacity-90"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>
    </PortalLayout>
  ),
});
