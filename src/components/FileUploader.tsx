import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { formatKb } from "@/lib/taxData";
import type { DocFile } from "@/components/AppStateContext";

interface FileUploaderProps {
  files: DocFile[];
  onUpload: (files: File[]) => void;
  onRemove?: (index: number) => void;
}

const FileUploader = ({ files, onUpload, onRemove }: FileUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (fileList) {
      const fileArr = Array.from(fileList);
      if (fileArr.length > 0) onUpload(fileArr);
    }
  };

  return (
    <div>
      <div
        className={`mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
          dragging ? "border-navy bg-navy/[0.04]" : "border-line bg-paper-2/60 hover:border-navy/30"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy/[0.06] text-navy">
          <Upload size={20} />
        </span>
        <span className="font-medium text-ink">Drag &amp; drop invoices or receipts</span>
        <span className="mt-1 text-xs text-muted-foreground">
          PDF or image files — or click to browse
        </span>
        <input
          accept="application/pdf,image/*"
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <ul className="divide-y overflow-hidden rounded-lg border border-line bg-white">
        {files.length === 0 && (
          <li className="p-4 text-center text-xs text-muted-foreground">
            No documents uploaded yet.
          </li>
        )}
        {files.map((file, idx) => (
          <li
            key={file.name + idx}
            className="group flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-paper-2/70"
          >
            <FileText size={16} className="shrink-0 text-navy/70" />
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{formatKb(file.size)}</span>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(idx)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader;
