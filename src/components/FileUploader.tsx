
import { useRef, useState } from "react";
import { Upload, Trash } from "lucide-react";

interface FileUploaderProps {
  companyId: string;
  files: File[];
  onUpload: (files: File[]) => void;
}

const FileUploader = ({ files, onUpload }: FileUploaderProps) => {
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
        className={`border-2 border-dashed rounded-lg p-6 mb-3 transition-colors flex flex-col items-center justify-center cursor-pointer ${
          dragging ? "border-primary bg-primary/5" : "border-muted"
        }`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={32} className="mb-2 text-primary" />
        <span className="font-medium">Drag & drop files here</span>
        <span className="text-xs text-muted-foreground">or click to browse</span>
        <input
          accept="application/pdf,image/*"
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>
      {/* Uploaded Files List */}
      <ul className="divide-y bg-muted/60 rounded-md">
        {files.length === 0 && (
          <li className="p-3 text-center text-xs text-muted-foreground">No files uploaded yet.</li>
        )}
        {files.map((file, idx) => (
          <li key={file.name + idx} className="px-3 py-2 flex items-center justify-between group">
            <span className="truncate">{file.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader;
