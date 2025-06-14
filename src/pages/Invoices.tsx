
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Invoices = () => {
  const { t } = useTranslation();
  // Placeholder for invoice list
  const [invoices, setInvoices] = useState([]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("Invoices & Receipts")}</h1>
      <button className="mb-4 bg-primary px-3 py-1 rounded text-white opacity-60 cursor-not-allowed" disabled>
        {t("Upload (coming soon)")}
      </button>
      {invoices.length === 0 ? (
        <div className="text-muted-foreground">{t("No invoices or receipts uploaded yet.")}</div>
      ) : (
        <ul>
          {/* Invoices list here */}
        </ul>
      )}
      <div className="mt-4 rounded bg-primary/10 p-4 text-sm text-primary font-semibold">{t("Invoice/receipt upload & analysis coming soon!")}</div>
    </div>
  );
};
export default Invoices;
