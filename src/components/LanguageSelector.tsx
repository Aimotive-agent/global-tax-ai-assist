
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "hi", label: "हिन्दी" },
  // Add more as desired
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <select
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
      className="px-3 py-2 rounded border bg-muted w-full max-w-xs"
    >
      {languages.map(l => (
        <option value={l.code} key={l.code}>{l.label}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;
