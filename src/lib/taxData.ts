export interface CountryTax {
  code: string;
  name: string;
  flag: string;
  form: string;
  authority: string;
  authorityUrl: string;
}

/** Single source of truth for supported jurisdictions and their headline tax form. */
export const countries: CountryTax[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    form: "IRS Form 1120 — Corporate Tax Return",
    authority: "IRS",
    authorityUrl: "https://www.irs.gov/forms-pubs/about-form-1120",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    form: "CT600 — Corporation Tax Return",
    authority: "HMRC",
    authorityUrl: "https://www.gov.uk/government/organisations/hm-revenue-customs",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    form: "Company Tax Return",
    authority: "ATO",
    authorityUrl: "https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/company-tax-return",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    form: "T2 — Corporation Income Tax Return",
    authority: "CRA",
    authorityUrl: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t2.html",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    form: "USt 1 A — VAT Return",
    authority: "BZSt",
    authorityUrl: "https://www.bzst.de/EN/Home/home_node.html",
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    form: "Formulaire 2031 — Liasse Fiscale",
    authority: "DGFiP",
    authorityUrl: "https://www.impots.gouv.fr/professionnel",
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    form: "ITR-6 — Company Income Tax Return",
    authority: "Income Tax Dept.",
    authorityUrl: "https://www.incometax.gov.in/iec/foportal",
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    form: "PND 50 — Corporate Income Tax Return",
    authority: "Revenue Dept.",
    authorityUrl: "https://www.rd.go.th/english/",
  },
];

export const getCountry = (code: string): CountryTax =>
  countries.find((c) => c.code === code) ?? countries[0];

export const formatKb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1024))} KB`;
