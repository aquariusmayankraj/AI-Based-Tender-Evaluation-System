import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I register as a new bidder?",
    a: "Click on 'Online Bidder Enrollment' from the home page or right rail. Fill in your company details, PAN, GST and contact info. An OTP will be sent to verify your mobile/email.",
  },
  {
    q: "I forgot my password. How do I reset?",
    a: "Use the 'Generate / Forgot Password?' link. Enter your registered email/mobile, verify the OTP and set a new password.",
  },
  {
    q: "What is Digital Signature Certificate (DSC) and is it mandatory?",
    a: "DSC is a Class III digital certificate issued by a licensed CA. It is mandatory for bid submission to ensure authenticity and non-repudiation.",
  },
  {
    q: "How does the AI Evaluation work?",
    a: "TenderAI parses the tender NIT and bidder submissions, extracts eligibility criteria, and matches them automatically. The engine outputs an Eligible / Not Eligible / Manual Review verdict with explainable reasoning.",
  },
  {
    q: "Where can I find the helpdesk number?",
    a: "Our 24×7 helpdesk is reachable at 1800-3070-2232 or support-eproc@nic.in.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ · eProcurement" }] }),
  component: () => {
    const [open, setOpen] = useState<number | null>(0);
    return (
      <PortalLayout>
        <SectionCard title="Frequently Asked Questions">
          <div className="divide-y divide-portal-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-portal-strip/40 transition"
                  >
                    <span className="font-semibold text-navy text-sm">
                      Q{i + 1}. {f.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-primary transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-foreground leading-relaxed">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>
      </PortalLayout>
    );
  },
});
