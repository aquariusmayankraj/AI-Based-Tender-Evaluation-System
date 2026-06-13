import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 60000,
});

export interface Criterion {
  criterion: string;
  required: string;
  bidder: string;
  status: "pass" | "fail" | "review";
  reason: string;
}

export interface EvaluationResult {
  status: "eligible" | "not_eligible" | "review";
  confidence: number;
  criteria: Criterion[];
  explanation: string;
  bidderName?: string;
}

export async function uploadTender(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await api.post("/upload-tender", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function uploadBidder(files: File[]) {
  const fd = new FormData();
  files.forEach((f) => fd.append("files", f));
  const { data } = await api.post("/upload-bidder", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function evaluate(): Promise<EvaluationResult> {
  const { data } = await api.post("/evaluate");
  return data;
}

export async function resetSession() {
  const { data } = await api.post("/reset");
  return data;
}

// Mock fallback when backend is unavailable
export function mockEvaluate(): EvaluationResult {
  return {
    status: "eligible",
    confidence: 87,
    bidderName: "Bharat Infra Solutions Pvt. Ltd.",
    criteria: [
      { criterion: "Annual Turnover", required: "≥ ₹50 Cr", bidder: "₹78 Cr", status: "pass", reason: "Exceeds minimum turnover requirement." },
      { criterion: "Years of Experience", required: "≥ 10 years", bidder: "14 years", status: "pass", reason: "Sufficient operational history." },
      { criterion: "ISO 9001 Certification", required: "Required", bidder: "Valid till 2027", status: "pass", reason: "Active certification on file." },
      { criterion: "EMD Submission", required: "₹2,00,000", bidder: "₹2,00,000", status: "pass", reason: "Earnest money received via DD." },
      { criterion: "Past Similar Projects", required: "≥ 3 of value ₹20Cr+", bidder: "2 verified, 1 unclear", status: "review", reason: "One project document needs manual verification." },
      { criterion: "PAN & GST Validity", required: "Active", bidder: "Active", status: "pass", reason: "Verified against GST portal." },
    ],
    explanation:
      "The bidder satisfies 5 of 6 mandatory criteria with high confidence. Financial strength, certifications, and EMD compliance are validated. One past-project document requires manual review by the procurement officer before final award. Overall, the AI engine recommends EligibleConditional Award subject to verification of the flagged item.",
  };
}
