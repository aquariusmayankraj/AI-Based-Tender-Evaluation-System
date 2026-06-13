import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help & Site Compatibility · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <SectionCard title="Help & Site Compatibility">
        <div className="p-5 space-y-4 text-sm">
          <Block title="Recommended Browsers">
            Mozilla Firefox 60+, Google Chrome 70+, Microsoft Edge 90+. Resolution 1280×720 or
            higher. JavaScript and Cookies must be enabled.
          </Block>
          <Block title="Digital Signature Certificate (DSC)">
            A valid Class III DSC issued by a licensed CA (eMudhra, (n)Code, Sify, NIC) is required
            for bid submission. Drivers for your USB token must be installed.
          </Block>
          <Block title="Java Requirement">
            Java JRE 1.8 or higher is required for signing utilities. Add the eProcure URL to the
            Java Exception Site List.
          </Block>
          <Block title="Hassle-Free Bid Submission Guidelines">
            Submit bids at least 2 hours before deadline. Ensure your DSC is plugged in. Do not
            close the browser window during upload.
          </Block>
          <Block title="Help for Contractors">
            Detailed bidder manuals, video tutorials and FAQs are available under{" "}
            <strong>Downloads</strong>. For real-time support call 1800-3070-2232.
          </Block>
        </div>
      </SectionCard>
    </PortalLayout>
  ),
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-portal-border rounded p-3 bg-portal-strip/30">
      <h3 className="font-display font-bold text-navy text-sm mb-1">{title}</h3>
      <p className="text-foreground leading-relaxed">{children}</p>
    </div>
  );
}
