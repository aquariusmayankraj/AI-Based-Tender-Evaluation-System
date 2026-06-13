import { Loader2, Sparkles } from "lucide-react";

const steps = [
  "Parsing tender document...",
  "Extracting eligibility criteria...",
  "Analyzing bidder submissions...",
  "Cross-verifying compliance...",
  "Computing AI confidence score...",
];

export function EvaluatingLoader() {
  return (
    <div className="bg-card rounded-lg border border-border shadow-elevated p-8 text-center">
      <div className="relative inline-block mb-4">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <div className="relative h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-white animate-pulse" />
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-foreground">Evaluating with AI...</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Our engine is analyzing documents against the eligibility matrix.
      </p>
      <ul className="mt-6 max-w-sm mx-auto space-y-2 text-left text-sm">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-2 text-muted-foreground"
            style={{ animation: `pulse 1.5s ${i * 0.2}s infinite` }}
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
