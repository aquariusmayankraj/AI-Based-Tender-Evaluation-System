import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, UserPlus } from "lucide-react";

export const Route = createFileRoute("/enrollment")({
  head: () => ({ meta: [{ title: "Online Bidder Enrollment · eProcurement" }] }),
  component: Enrollment,
});

function Enrollment() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  if (done) {
    return (
      <PortalLayout>
        <SectionCard title="Enrollment Successful">
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="h-14 w-14 text-success mx-auto" />
            <h2 className="font-display text-xl font-bold text-navy">
              Bidder Account Created
            </h2>
            <p className="text-sm text-foreground">
              An OTP has been sent to your registered email & mobile. Use your User ID to login.
            </p>
            <div className="inline-block px-4 py-2 rounded bg-portal-strip border border-portal-border font-mono text-navy">
              User ID: <strong>BID-{Math.floor(Math.random() * 900000 + 100000)}</strong>
            </div>
            <div>
              <Link to="/" className="text-primary hover:underline text-sm font-semibold">
                ← Back to Home
              </Link>
            </div>
          </div>
        </SectionCard>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <SectionCard title="Online Enrollment of Corporate / Bidder">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setBusy(true);
            setTimeout(() => {
              setBusy(false);
              setDone(true);
            }, 1100);
          }}
          className="p-5 grid sm:grid-cols-2 gap-3 text-sm"
        >
          <F label="Company Name" name="company" required />
          <F label="PAN" name="pan" placeholder="ABCDE1234F" required />
          <F label="GSTIN" name="gst" placeholder="22AAAAA0000A1Z5" required />
          <F label="Authorized Person" name="person" required />
          <F label="Designation" name="desig" />
          <F label="Email" name="email" type="email" required />
          <F label="Mobile" name="mobile" type="tel" required />
          <F label="Login ID (preferred)" name="login" required />
          <F label="Password" name="pass" type="password" required />
          <F label="Confirm Password" name="cpass" type="password" required />
          <label className="text-xs sm:col-span-2">
            <div className="font-semibold text-navy mb-1">Registered Address</div>
            <textarea
              name="address"
              required
              rows={3}
              className="w-full px-2 py-1.5 border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="sm:col-span-2 text-xs flex items-center gap-2">
            <input type="checkbox" required />
            <span>
              I agree to the{" "}
              <Link to="/help" className="text-primary hover:underline">
                Terms of Use
              </Link>{" "}
              and confirm all information is true.
            </span>
          </label>
          <button
            disabled={busy}
            className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-gradient-hero text-white text-sm font-bold shadow-card disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" />
            {busy ? "Submitting..." : "Submit Enrollment"}
          </button>
        </form>
      </SectionCard>
    </PortalLayout>
  );
}

function F({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="text-xs">
      <div className="font-semibold text-navy mb-1">
        {label} {required && <span className="text-destructive">*</span>}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-2 py-1.5 border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
