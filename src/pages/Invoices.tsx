
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<null | string>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
    setUploadStatus(null);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploadStatus(t("Uploading..."));
    setTimeout(() => {
      setUploadStatus(`${t("File uploaded:")} ${selectedFile.name}`);
      setSelectedFile(null);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-xl">
      <button
        className="mb-4 px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-accent transition"
        onClick={() => navigate("/")}
      >
        ← {t("Back")}
      </button>
      <h1 className="text-2xl font-bold mb-2">{t("Invoices & Receipts")}</h1>
      <form onSubmit={handleUpload} className="mb-6 flex flex-col gap-4">
        <label className="block">
          {t("Upload a receipt or invoice file")}
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
        </label>
        <Button type="submit" disabled={!selectedFile}>
          {t("Upload")}
        </Button>
        {uploadStatus && (
          <div className="text-sm text-muted-foreground">{uploadStatus}</div>
        )}
      </form>
      <div className="text-muted-foreground">
        {t("No automated parsing yet. This is a placeholder for uploading and managing invoice/receipt files.")}
      </div>
    </div>
  );
};

export default Invoices;
