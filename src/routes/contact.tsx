import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us · eProcurement" }] }),
  component: () => (
    <PortalLayout>
      <div className="grid md:grid-cols-2 gap-4">
        <SectionCard title="Contact Information">
          <div className="p-4 space-y-3 text-sm">
            <Row icon={<Phone />} label="24×7 Helpdesk" value="1800-3070-2232" />
            <Row icon={<Mail />} label="Support Email" value="support-eproc@nic.in" />
            <Row icon={<MapPin />} label="Address" value="National Informatics Centre, A-Block, CGO Complex, Lodhi Road, New Delhi - 110003" />
          </div>
        </SectionCard>
        <SectionCard title="Send us a message">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Your message has been sent. Ticket #" + Math.floor(Math.random() * 99999));
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="p-4 space-y-3 text-sm"
          >
            <Input label="Name" name="name" required />
            <Input label="Email" name="email" type="email" required />
            <Input label="Subject" name="subj" required />
            <label className="block text-xs">
              <div className="font-semibold text-navy mb-1">Message</div>
              <textarea
                name="msg"
                required
                rows={4}
                className="w-full px-2 py-1.5 border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <button className="w-full px-4 py-2 rounded bg-gradient-hero text-white text-sm font-bold">
              Submit
            </button>
          </form>
        </SectionCard>
      </div>
    </PortalLayout>
  ),
});

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 p-3 rounded bg-portal-strip/40 border border-portal-border">
      <div className="text-primary [&>svg]:h-5 [&>svg]:w-5">{icon}</div>
      <div>
        <div className="text-xs font-semibold text-navy">{label}</div>
        <div className="text-foreground">{value}</div>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-xs">
      <div className="font-semibold text-navy mb-1">{label}</div>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-2 py-1.5 border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
