
const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
  { code: "IN", name: "India" },
  // Add more as needed
];

interface Props {
  selected: string;
  onSelect: (countryCode: string) => void;
}

const CountrySelector = ({ selected, onSelect }: Props) => (
  <select
    value={selected}
    onChange={e => onSelect(e.target.value)}
    className="text-sm px-2 py-1 border rounded bg-muted outline-none text-foreground"
    style={{minWidth:120}}
    aria-label="Select country"
  >
    {countries.map(c => (
      <option value={c.code} key={c.code}>{c.name}</option>
    ))}
  </select>
);

export default CountrySelector;
