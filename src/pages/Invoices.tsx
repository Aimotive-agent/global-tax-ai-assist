
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Invoice {
  id: number;
  name: string;
  url: string;
  uploadedAt: string;
}

const Invoices = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const file = files[0];
    // Simulate upload and parsing, store as a local URL for preview
    const url = URL.createObjectURL(file);
    setInvoices(prev => [
      ...prev,
      {
        id: Date.now(),
        name: file.name,
        url,
        uploadedAt: new Date().toLocaleString(),
      },
    ]);
    toast({
      title: t("Invoice uploaded!"),
      description: file.name,
    });
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">{t("Invoices & Receipts")}</h1>
      <input
        type="file"
        accept="application/pdf,image/*"
        className="hidden"
        ref={inputRef}
        onChange={onUpload}
      />
      <Button className="mb-4" onClick={() => inputRef.current?.click()}>
        {t("Upload Invoice/Receipt")}
      </Button>
      {invoices.length === 0 ? (
        <div className="text-muted-foreground">{t("No invoices or receipts uploaded yet.")}</div>
      ) : (
        <ul className="space-y-2 mb-4">
          {invoices.map(inv => (
            <li key={inv.id} className="bg-muted rounded px-3 py-2 flex justify-between items-center gap-2">
              <span>
                <span className="font-semibold">{inv.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">{inv.uploadedAt}</span>
              </span>
              <a href={inv.url} target="_blank" rel="noopener noreferrer" className="underline text-primary text-sm">{t("View")}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Invoices;
