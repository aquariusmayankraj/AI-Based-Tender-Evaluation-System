import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SectionCard } from "@/components/portal/SectionCard";
import { useState } from "react";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Generate / Forgot Password · eProcurement" }] }),
  component: () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [busy, setBusy] = useState(false);
    return (
      <PortalLayout>
        <SectionCard title="Generate / Forgot Password">
          <div className="p-5 max-w-md mx-auto space-y-4">
            <div className="flex justify-between text-xs font-semibold">
              {["Verify ID", "Enter OTP", "Reset"].map((s, i) => (
                <div
                  key={s}
                  className={`flex-1 text-center py-2 border-b-2 ${
                    step >= ((i + 1) as 1 | 2 | 3)
                      ? "border-primary text-primary"
                      : "border-portal-border text-muted-foreground"
                  }`}
                >
                  {i + 1}. {s}
                </div>
              ))}
            </div>

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBusy(true);
                  setTimeout(() => {
                    setBusy(false);
                    setStep(2);
                    toast.success("OTP sent to registered mobile/email");
                  }, 800);
                }}
                className="space-y-3"
              >
                <Input label="Login ID / Email" required />
                <Input label="Registered Mobile" required />
                <button
                  disabled={busy}
                  className="w-full px-4 py-2 rounded bg-navy text-white text-sm font-semibold disabled:opacity-60"
                >
                  {busy ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                  toast.success("OTP verified");
                }}
                className="space-y-3"
              >
                <Input label="6-digit OTP" required placeholder="••••••" />
                <button className="w-full px-4 py-2 rounded bg-navy text-white text-sm font-semibold">
                  Verify
                </button>
              </form>
            )}

            {step === 3 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Password reset successfully");
                  setStep(1);
                }}
                className="space-y-3"
              >
                <Input label="New Password" type="password" required />
                <Input label="Confirm Password" type="password" required />
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-gradient-hero text-white text-sm font-bold">
                  <KeyRound className="h-4 w-4" />
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </SectionCard>
      </PortalLayout>
    );
  },
});

function Input({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-xs">
      <div className="font-semibold text-navy mb-1">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-2 py-1.5 border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
