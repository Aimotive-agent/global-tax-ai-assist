import { countries } from "@/lib/taxData";

interface Props {
  selected: string;
  onSelect: (countryCode: string) => void;
}

const CountrySelector = ({ selected, onSelect }: Props) => (
  <select
    value={selected}
    onChange={(e) => onSelect(e.target.value)}
    className="h-9 rounded-md border border-line bg-white px-3 text-sm text-foreground transition hover:border-navy/30"
    aria-label="Select country"
  >
    {countries.map((c) => (
      <option value={c.code} key={c.code}>
        {c.flag} {c.name}
      </option>
    ))}
  </select>
);

export default CountrySelector;
