import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { useState } from "react";
import { Phone, Mail, MapPin, UserSearch } from "lucide-react";

const officers = [
  { state: "Andhra Pradesh", name: "Sri R. Ramesh", office: "AP State Procurement Cell", phone: "0863-2340101", email: "no.ap@nic.in" },
  { state: "Delhi", name: "Sri V. K. Saxena", office: "GNCTD Procurement", phone: "011-23357000", email: "no.delhi@nic.in" },
  { state: "Karnataka", name: "Smt. Lakshmi N.", office: "Centre for e-Governance", phone: "080-22250505", email: "no.ka@nic.in" },
  { state: "Maharashtra", name: "Sri A. K. Patil", office: "GoM IT Department", phone: "022-22025000", email: "no.mh@nic.in" },
  { state: "Tamil Nadu", name: "Smt. P. Janaki", office: "TN Tenders Cell", phone: "044-25671234", email: "no.tn@nic.in" },
  { state: "Uttar Pradesh", name: "Sri D. Mishra", office: "UP eProcurement Cell", phone: "0522-2238181", email: "no.up@nic.in" },
  { state: "West Bengal", name: "Sri S. Banerjee", office: "WB Finance (Audit)", phone: "033-22148000", email: "no.wb@nic.in" },
];

export const Route = createFileRoute("/nodal-officer")({
  head: () => ({ meta: [{ title: "Find My Nodal Officer · eProcurement" }] }),
  component: () => {
    const [state, setState] = useState("");
    const filtered = state
      ? officers.filter((o) => o.state.toLowerCase().includes(state.toLowerCase()))
      : officers;

    return (
      <PortalLayout>
        <SectionCard title="Find My Nodal Officer">
          <div className="p-4 bg-portal-strip/40 border-b border-portal-border flex items-center gap-2">
            <UserSearch className="h-4 w-4 text-primary" />
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Search by State / UT"
              className="flex-1 px-3 py-1.5 text-sm border border-portal-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 p-4">
            {filtered.map((o) => (
              <div key={o.state} className="border border-portal-border rounded p-3 bg-card hover:shadow-elevated transition">
                <div className="text-xs uppercase tracking-wider text-primary font-bold">
                  {o.state}
                </div>
                <div className="font-display font-bold text-navy mt-1">{o.name}</div>
                <div className="text-xs text-muted-foreground">{o.office}</div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-primary" />
                    <a href={`tel:${o.phone}`} className="hover:underline">{o.phone}</a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-primary" />
                    <a href={`mailto:${o.email}`} className="hover:underline">{o.email}</a>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="sm:col-span-2 text-center text-sm text-muted-foreground py-6">
                <MapPin className="h-5 w-5 mx-auto mb-2" />
                No officer found for "{state}".
              </div>
            )}
          </div>
        </SectionCard>
      </PortalLayout>
    );
  },
});
