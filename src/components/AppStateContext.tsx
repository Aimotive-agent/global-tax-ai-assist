
import React, { createContext, useContext, useState } from "react";

type Company = { id: string; name: string };
type UploadedFiles = { [companyId: string]: File[] };

interface AppState {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  selectedCompany: string | null;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string | null>>;
  uploadedFiles: UploadedFiles;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFiles>>;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  return (
    <AppStateContext.Provider
      value={{
        companies,
        setCompanies,
        selectedCompany,
        setSelectedCompany,
        uploadedFiles,
        setUploadedFiles,
        selectedCountry,
        setSelectedCountry
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
};
