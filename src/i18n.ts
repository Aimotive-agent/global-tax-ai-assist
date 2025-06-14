
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Tax AI Assistant": "Tax AI Assistant",
      "Ask your tax questions below. This area can be connected to AI in the future!": "Ask your tax questions below. This area can be connected to AI in the future!",
      "Type your tax question here...": "Type your tax question here...",
      "Send (coming soon)": "Send (coming soon)",
      "Full interactive AI tax assistant coming soon!": "Full interactive AI tax assistant coming soon!",

      "Invoices & Receipts": "Invoices & Receipts",
      "Upload (coming soon)": "Upload (coming soon)",
      "No invoices or receipts uploaded yet.": "No invoices or receipts uploaded yet.",
      "Invoice/receipt upload & analysis coming soon!": "Invoice/receipt upload & analysis coming soon!",

      "Tax Forms": "Tax Forms",
      "Your country-specific tax forms will be shown here soon.": "Your country-specific tax forms will be shown here soon.",
      "Tax form previews & downloads coming soon!": "Tax form previews & downloads coming soon!",

      "Settings": "Settings",
      "Language": "Language",
      "More settings coming soon!": "More settings coming soon!",
    }
  },
  // Add translations for other languages
  es: { translation: { /* Spanish translations here, see README to expand */ } },
  fr: { translation: { /* French translations */ } },
  de: { translation: { /* German translations */ } },
  it: { translation: { /* Italian translations */ } },
  pt: { translation: { /* Portuguese translations */ } },
  zh: { translation: { /* Chinese translations */ } },
  ja: { translation: { /* Japanese translations */ } },
  hi: { translation: { /* Hindi translations */ } },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
