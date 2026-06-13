import { useState } from "react";
import { X, LogIn, KeyRound, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { useUser } from "@/lib/appStore";

export function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [busy, setBusy] = useState(false);
  const [captcha, setCaptcha] = useState(() => Math.random().toString(36).slice(2, 7).toUpperCase());
  const [, setUser] = useUser();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-lg w-full max-w-md shadow-elevated overflow-hidden border border-portal-border"
      >
        <div className="h-1 bg-tricolor" />
        <div className="bg-gradient-portal text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-gov-gold" />
            <h2 className="font-display font-bold">TenderAI Login</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form
          className="p-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setBusy(true);
            const fd = new FormData(e.currentTarget);
            setTimeout(() => {
              setBusy(false);
              if (String(fd.get("captcha")).toUpperCase() !== captcha) {
                toast.error("Invalid captcha. Please try again.");
                setCaptcha(Math.random().toString(36).slice(2, 7).toUpperCase());
                return;
              }
              const name = String(fd.get("user") || "Bidder").split("@")[0];
              setUser({ name, role: "Procurement Officer" });
              toast.success(`Welcome, ${name}`);
              onClose();
            }, 900);
          }}
        >
          <Field label="Login ID" name="user" placeholder="bidder@example.com" required />
          <Field label="Password" name="pass" type="password" placeholder="••••••••" required />
          <div>
            <label className="text-xs font-semibold text-navy block mb-1">Enter Captcha</label>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 bg-portal-strip border border-portal-border rounded font-mono font-bold tracking-widest text-navy select-none italic line-through decoration-1">
                {captcha}
              </div>
              <button
                type="button"
                onClick={() => setCaptcha(Math.random().toString(36).slice(2, 7).toUpperCase())}
                className="px-2 py-1.5 border border-portal-border rounded hover:bg-portal-bg"
                title="Refresh captcha"
              >
                <RefreshCw className="h-3 w-3 text-navy" />
              </button>
              <input
                name="captcha"
                required
                className="flex-1 px-3 py-1.5 text-sm border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                placeholder="Type above"
              />
            </div>
          </div>
          <button
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded bg-gradient-hero text-white font-bold text-sm shadow-card hover:shadow-elevated transition disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {busy ? "Authenticating..." : "Login"}
          </button>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-portal-border">
            <Link to="/forgot-password" onClick={onClose} className="text-primary hover:underline flex items-center gap-1">
              <KeyRound className="h-3 w-3" /> Forgot password?
            </Link>
            <Link to="/enrollment" onClick={onClose} className="text-primary hover:underline">
              New bidder? Enroll →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
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
    <div>
      <label className="text-xs font-semibold text-navy block mb-1">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 text-sm border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
