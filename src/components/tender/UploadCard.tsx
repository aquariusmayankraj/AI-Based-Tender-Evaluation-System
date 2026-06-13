import { useRef, useState, DragEvent } from "react";
import { UploadCloud, FileText, X, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  onUpload: () => Promise<void> | void;
  uploading: boolean;
  uploaded: boolean;
  accent?: "primary" | "navy";
}

export function UploadCard({
  title,
  subtitle,
  multiple,
  files,
  onChange,
  onUpload,
  uploading,
  uploaded,
  accent = "primary",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list);
    onChange(multiple ? [...files, ...arr] : arr.slice(0, 1));
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  const accentRing = accent === "navy" ? "border-navy/40" : "border-primary/40";
  const accentBg = accent === "navy" ? "bg-navy/5" : "bg-primary/5";

  return (
    <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden flex flex-col">
      <div className="px-5 py-3 border-b border-border bg-secondary/60 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {uploaded && <CheckCircle2 className="h-5 w-5 text-success" />}
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragOver ? `${accentRing} ${accentBg} scale-[1.01]` : "border-border hover:border-primary/40 hover:bg-accent/40"
          }`}
        >
          <UploadCloud className={`mx-auto h-10 w-10 mb-2 ${accent === "navy" ? "text-navy" : "text-primary"}`} />
          <p className="text-sm font-medium text-foreground">
            Drag &amp; drop {multiple ? "files" : "a file"} here
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or click to browse · PDF, DOC, DOCX
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {files.length > 0 && (
          <ul className="space-y-2 max-h-40 overflow-auto">
            {files.map((f, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-secondary/60 border border-border text-sm"
              >
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium text-foreground">{f.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(f.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(files.filter((_, idx) => idx !== i));
                  }}
                  className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          disabled={files.length === 0 || uploading}
          onClick={() => onUpload()}
          className={`mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${
            accent === "navy"
              ? "bg-navy text-white hover:opacity-90"
              : "bg-primary text-primary-foreground hover:opacity-90"
          } disabled:opacity-50 disabled:cursor-not-allowed shadow-card hover:shadow-elevated`}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : uploaded ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Uploaded ({files.length})
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4" />
              Upload {multiple ? "Bidder Documents" : "Tender"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
