import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";

const groups: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Tenders",
    links: [
      { label: "Active Tenders", to: "/tenders" },
      { label: "Tenders by Closing Date", to: "/tenders" },
      { label: "Search Tenders", to: "/search" },
      { label: "Corrigendums", to: "/corrigendum" },
      { label: "Results / Awards", to: "/results" },
    ],
  },
  {
    title: "Bidder Services",
    links: [
      { label: "Online Enrollment", to: "/enrollment" },
      { label: "Forgot Password", to: "/forgot-password" },
      { label: "Find My Nodal Officer", to: "/nodal-officer" },
      { label: "Bidders Manual Kit", to: "/help" },
    ],
  },
  {
    title: "AI & Reports",
    links: [
      { label: "TenderAI Evaluation", to: "/evaluation" },
      { label: "MIS Reports", to: "/reports" },
      { label: "Announcements", to: "/announcements" },
      { label: "Downloads", to: "/downloads" },
      { label: "Debarment List", to: "/debarment" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Help & Site Compatibility", to: "/help" },
    ],
  },
];

export const Route = createFileRoute("/sitemap")({
  head: () => ({ meta: [{ title: "Sitemap · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="Sitemap">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="font-display font-bold text-navy text-sm border-b border-portal-border pb-1 mb-2">
                {g.title}
              </h3>
              <ul className="space-y-1 text-sm">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-primary hover:underline">
                      › {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>
    </PortalLayout>
  ),
});
