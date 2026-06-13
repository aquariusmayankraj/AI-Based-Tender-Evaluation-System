import type { ReactNode } from "react";
import { FolderOpen } from "lucide-react";

export function SectionCard({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="bg-card border border-portal-border rounded shadow-card overflow-hidden">
      <div className="flex items-center justify-between bg-gradient-portal-light px-4 py-2 border-b border-portal-border">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-navy" />
          <h2 className="font-display font-bold text-navy text-sm">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
