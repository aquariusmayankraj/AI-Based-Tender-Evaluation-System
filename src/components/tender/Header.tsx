import { UserCircle2, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card shadow-card">
      {/* Tricolor strip */}
      <div className="h-1.5 bg-tricolor" />
      <div className="bg-navy text-white text-xs px-4 py-1 flex items-center justify-between">
        <span>भारत सरकार | Government of India · Ministry of Commerce</span>
        <span className="hidden sm:inline">Skip to Main Content · A- A A+ · हिंदी</span>
      </div>
      <div className="px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
              TenderAI <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              AI-Powered Tender Evaluation System · eProcurement 
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold text-success">AI Engine Online</span>
          </div>
          <button className="p-2 rounded-md hover:bg-accent transition-colors relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <UserCircle2 className="h-8 w-8 text-primary" />
            <div className="hidden sm:block text-xs leading-tight">
              <div className="font-semibold text-foreground">A. Sharma</div>
              <div className="text-muted-foreground">Procurement Officer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
