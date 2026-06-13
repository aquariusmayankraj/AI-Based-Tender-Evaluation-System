import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/tender/Header";
import { Navbar } from "@/components/tender/Navbar";
import { NoticeTicker } from "@/components/tender/NoticeTicker";
import { Sidebar } from "@/components/tender/Sidebar";
import { UploadCard } from "@/components/tender/UploadCard";
import { StatBar } from "@/components/tender/StatBar";
import { EvaluatingLoader } from "@/components/tender/EvaluatingLoader";
import { ResultSection } from "@/components/tender/ResultSection";
import { uploadTender, uploadBidder, evaluate, mockEvaluate, type EvaluationResult } from "@/lib/api";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: "TenderAI Dashboard — AI-Powered Tender Evaluation System" },
      {
        name: "description",
        content:
          "Government-grade AI tender evaluation dashboard. Upload tender & bidder documents and get instant eligibility analysis with explainable AI reasoning.",
      },
      { property: "og:title", content: "TenderAI Dashboard — AI Tender Evaluation" },
      {
        property: "og:description",
        content:
          "Modern eProcurement evaluation system powered by AI. Faster, transparent and compliant with GFR 2017.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [tenderFiles, setTenderFiles] = useState<File[]>([]);
  const [bidderFiles, setBidderFiles] = useState<File[]>([]);
  const [tenderUploading, setTenderUploading] = useState(false);
  const [bidderUploading, setBidderUploading] = useState(false);
  const [tenderUploaded, setTenderUploaded] = useState(false);
  const [bidderUploaded, setBidderUploaded] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  async function handleTenderUpload() {
    setTenderUploading(true);
    try {
      await uploadTender(tenderFiles[0]);
      setTenderUploaded(true);
      toast.success("Tender document uploaded successfully");
    } catch {
      // Backend optional — accept locally
      setTenderUploaded(true);
      toast.success("Tender document staged (offline mode)");
    } finally {
      setTenderUploading(false);
    }
  }

  async function handleBidderUpload() {
    setBidderUploading(true);
    try {
      await uploadBidder(bidderFiles);
      setBidderUploaded(true);
      toast.success(`${bidderFiles.length} bidder document(s) uploaded`);
    } catch {
      setBidderUploaded(true);
      toast.success(`${bidderFiles.length} bidder document(s) staged (offline mode)`);
    } finally {
      setBidderUploading(false);
    }
  }

  async function handleEvaluate() {
    if (!tenderUploaded || !bidderUploaded) {
      toast.error("Please upload both tender and bidder documents first.");
      return;
    }
    setEvaluating(true);
    setResult(null);
    try {
      const data = await evaluate();
      setResult(data);
      toast.success("Evaluation complete");
    } catch {
      // Fallback demo data
      await new Promise((r) => setTimeout(r, 2200));
      setResult(mockEvaluate());
      toast.message("Showing demo evaluation (backend offline)");
    } finally {
      setEvaluating(false);
    }
  }

  const canEvaluate = tenderUploaded && bidderUploaded && !evaluating;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar />
      <NoticeTicker />

      {/* Breadcrumb */}
      <div className="px-4 sm:px-8 py-3 bg-secondary/40 border-b border-border text-xs text-muted-foreground flex items-center gap-1">
        <span>Home</span>
        <ChevronRight className="h-3 w-3" />
        <span>Dashboard</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-semibold">AI Tender Evaluation</span>
      </div>

      <main className="px-4 sm:px-8 py-6 grid lg:grid-cols-[1fr_320px] gap-6 max-w-[1600px] mx-auto">
        <div className="space-y-6 min-w-0">
          {/* Hero strip */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-border bg-card overflow-hidden shadow-card"
          >
            <div className="bg-gradient-hero px-6 py-5 text-white flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-xs font-semibold mb-2">
                  <Sparkles className="h-3 w-3" />
                  NEW · AI Engine v2.4
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                  Evaluate Tender Eligibility in Seconds
                </h2>
                <p className="text-sm text-white/85 mt-1 max-w-2xl">
                  Upload the tender notice and bidder submissions. Our explainable AI cross-checks every clause against GFR 2017 and CVC compliance rules.
                </p>
              </div>
            </div>
            <div className="p-4">
              <StatBar />
            </div>
          </motion.div>

          {/* Upload split */}
          <div className="grid md:grid-cols-2 gap-5">
            <UploadCard
              title="Step 1 · Tender Document"
              subtitle="Official tender notice (NIT/RFP)"
              files={tenderFiles}
              onChange={(f) => {
                setTenderFiles(f);
                setTenderUploaded(false);
              }}
              onUpload={handleTenderUpload}
              uploading={tenderUploading}
              uploaded={tenderUploaded}
            />
            <UploadCard
              title="Step 2 · Bidder Documents"
              subtitle="Multiple PDFs/DOCs from bidder"
              multiple
              files={bidderFiles}
              onChange={(f) => {
                setBidderFiles(f);
                setBidderUploaded(false);
              }}
              onUpload={handleBidderUpload}
              uploading={bidderUploading}
              uploaded={bidderUploaded}
              accent="navy"
            />
          </div>

          {/* CTA */}
          <div className="bg-card rounded-lg border border-border shadow-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Step 3 · Run AI Evaluation</h3>
                <p className="text-sm text-muted-foreground">
                  {canEvaluate
                    ? "All documents ready. Click to start the eligibility analysis."
                    : "Complete steps 1 & 2 above to enable evaluation."}
                </p>
              </div>
            </div>
            <button
              disabled={!canEvaluate}
              onClick={handleEvaluate}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-gradient-hero text-white font-bold text-sm tracking-wide shadow-glow hover:shadow-elevated hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Sparkles className="h-4 w-4" />
              Evaluate Eligibility
            </button>
          </div>

          {evaluating && <EvaluatingLoader />}
          {result && !evaluating && <ResultSection result={result} />}

          {!evaluating && !result && (
            <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <AlertCircle className="h-6 w-6 text-muted-foreground/70" />
              Evaluation results will appear here after you run the analysis.
            </div>
          )}
        </div>

        <Sidebar />
      </main>

      <footer className="border-t border-border bg-navy text-white/80 text-xs px-4 sm:px-8 py-4 mt-8">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© 2026 TenderAI · Government of India · Ministry of Commerce & Industry</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Accessibility</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
