import { LayoutDashboard, FileText, Briefcase, ClipboardCheck, BarChart3, Settings } from "lucide-react";
import { useState } from "react";

const items = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Tenders", icon: FileText },
  { label: "My Bids", icon: Briefcase },
  { label: "Evaluation", icon: ClipboardCheck },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export function Navbar() {
  const [active, setActive] = useState("Dashboard");
  return (
    <nav className="bg-primary text-primary-foreground border-b border-primary/30">
      <div className="px-4 sm:px-8 flex items-center gap-1 overflow-x-auto">
        {items.map((it) => {
          const isActive = active === it.label;
          return (
            <button
              key={it.label}
              onClick={() => setActive(it.label)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? "border-gov-gold text-white bg-white/10"
                  : "border-transparent text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
