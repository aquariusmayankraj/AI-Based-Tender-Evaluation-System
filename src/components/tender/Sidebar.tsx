import { LinkIcon, LifeBuoy, History, ChevronRight } from "lucide-react";

const quickLinks = [
  "Online Bidder Enrollment",
  "Generate / Forgot Password",
  "Find My Nodal Officer",
  "Advanced Tender Search",
  "Bidder Manuals & Videos",
  "GFR / CVC Guidelines",
];

const recent = [
  { id: "GOI-2026-INFRA-0421", status: "Eligible", tone: "success" as const },
  { id: "GOI-2026-IT-0398", status: "Review", tone: "warning" as const },
  { id: "GOI-2026-DEF-0377", status: "Not Eligible", tone: "destructive" as const },
  { id: "GOI-2026-HLTH-0356", status: "Eligible", tone: "success" as const },
];

const toneClasses: Record<string, string> = {
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/20 text-warning-foreground border-warning/40",
  destructive: "bg-destructive/15 text-destructive border-destructive/30",
};

export function Sidebar() {
  return (
    <aside className="space-y-4">
      <Section icon={<LinkIcon className="h-4 w-4" />} title="Quick Links">
        <ul className="divide-y divide-border">
          {quickLinks.map((q) => (
            <li key={q}>
              <a
                href="#"
                className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent/60 transition-colors group"
              >
                <span className="text-foreground">{q}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={<History className="h-4 w-4" />} title="Recent Evaluations">
        <ul className="p-3 space-y-2">
          {recent.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-secondary/50 border border-border text-xs"
            >
              <span className="font-mono text-foreground truncate">{r.id}</span>
              <span className={`px-2 py-0.5 rounded-full border font-semibold ${toneClasses[r.tone]}`}>
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={<LifeBuoy className="h-4 w-4" />} title="Helpdesk">
        <div className="p-4 text-sm space-y-2">
          <p className="text-muted-foreground">
            24×7 support for procurement officers and bidders.
          </p>
          <div className="text-foreground font-mono text-xs">
            ☎ 1800-3070-2232
          </div>
          <div className="text-foreground font-mono text-xs">
            ✉ support@tenderai.gov.in
          </div>
          <button className="w-full mt-2 px-3 py-2 rounded-md bg-navy text-white text-xs font-semibold hover:opacity-90 transition">
            Raise a Ticket
          </button>
        </div>
      </Section>
    </aside>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-navy text-white">
        {icon}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
