import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  onLanguageChange?: (code: string) => void;
}

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "ko", label: "한국어" },
  { code: "tr", label: "Türkçe" },
  { code: "fa", label: "فارسی" },
];

const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  return (
    <select
      value={i18n.language}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        if (onLanguageChange) onLanguageChange(e.target.value);
      }}
      className="h-9 rounded-md border border-line bg-white px-3 text-sm text-foreground transition hover:border-navy/30"
      aria-label="Select language"
    >
      {languages.map((l) => (
        <option value={l.code} key={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
