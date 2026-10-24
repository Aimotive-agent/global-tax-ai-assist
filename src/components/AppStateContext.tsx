import React, { createContext, useContext, useEffect, useState } from "react";

/** Uploaded documents are stored as metadata (File objects don't survive reloads). */
export type DocFile = { name: string; size: number; type?: string };

type Company = { id: string; name: string };
type UploadedFiles = { [companyId: string]: DocFile[] };

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

const STORAGE_KEY = "veritas-tax-ai:app-state";

interface Persisted {
  companies: Company[];
  selectedCompany: string | null;
  uploadedFiles: UploadedFiles;
  selectedCountry: string;
}

const loadState = (): Partial<Persisted> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<Persisted>) : {};
  } catch {
    return {};
  }
};

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const initial = loadState();
  const [companies, setCompanies] = useState<Company[]>(initial.companies ?? []);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    initial.selectedCompany ?? null
  );
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>(initial.uploadedFiles ?? {});
  const [selectedCountry, setSelectedCountry] = useState<string>(initial.selectedCountry ?? "US");

  // Keep the workspace across reloads.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ companies, selectedCompany, uploadedFiles, selectedCountry })
      );
    } catch {
      /* storage full or unavailable — keep working in-memory */
    }
  }, [companies, selectedCompany, uploadedFiles, selectedCountry]);

  // Drop a stale selection (e.g. company deleted or state tampered with).
  useEffect(() => {
    if (selectedCompany && !companies.some((c) => c.id === selectedCompany)) {
      setSelectedCompany(null);
    }
  }, [companies, selectedCompany]);

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
        setSelectedCountry,
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
