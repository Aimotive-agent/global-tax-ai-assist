import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import SidebarNav from "@/components/SidebarNav";
import CompanyList from "@/components/CompanyList";
import CreateCompanyModal from "@/components/CreateCompanyModal";
import FileUploader from "@/components/FileUploader";
import CountrySelector from "@/components/CountrySelector";
import TaxFormPreview from "@/components/TaxFormPreview";
import { useAppState } from "@/components/AppStateContext";

const Index = () => {
  const {
    companies, setCompanies,
    selectedCompany, setSelectedCompany,
    uploadedFiles, setUploadedFiles,
    selectedCountry, setSelectedCountry
  } = useAppState();
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  // Handler props
  const handleCreateCompany = (name: string) => {
    const newCompany = { id: `${Date.now()}`, name };
    setCompanies(prev => [...prev, newCompany]);
    setShowCreateCompany(false);
  };

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleFileUpload = (companyId: string, files: File[]) => {
    setUploadedFiles(prev => ({
      ...prev,
      [companyId]: [...(prev[companyId] || []), ...files]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fbc2eb] via-[#a1c4fd] to-[#c2ffd8] flex text-left">
      <SidebarNav
        companies={companies}
        selectedCompany={selectedCompany}
        onSelectCompany={handleSelectCompany}
        onAddCompany={() => setShowCreateCompany(true)}
      />
      <main className="flex-1 flex flex-col min-h-screen bg-transparent p-0">
        <DashboardHeader />
        <div className="container mx-auto py-8 flex flex-col gap-8 flex-1">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Company List */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gradient bg-gradient-to-r from-[#fc5c7d] to-[#6a82fb] bg-clip-text text-transparent">Companies</h2>
                <button
                  onClick={() => setShowCreateCompany(true)}
                  className="px-3 py-1 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/80 transition shadow"
                >
                  + Add Company
                </button>
              </div>
              <CompanyList
                companies={companies}
                selectedCompany={selectedCompany}
                onSelect={handleSelectCompany}
              />
            </div>
            {/* Center Column: File Uploader and Invoices */}
            <div className="col-span-2 flex flex-col gap-8">
              <div className="rounded-xl border bg-white/90 shadow-2xl p-6">
                <h2 className="text-lg font-semibold mb-2 text-primary">Upload Invoices & Receipts</h2>
                {selectedCompany ? (
                  <FileUploader
                    companyId={selectedCompany}
                    files={uploadedFiles[selectedCompany] || []}
                    onUpload={files => handleFileUpload(selectedCompany, files)}
                  />
                ) : (
                  <div className="text-muted-foreground text-sm">Select a company to upload documents.</div>
                )}
              </div>
              <div className="rounded-xl border bg-white/90 p-6 shadow-xl flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-lg font-semibold text-gradient bg-gradient-to-r from-[#fc5c7d] to-[#6a82fb] bg-clip-text text-transparent">Tax AI Assistant</span>
                    <span className="block text-muted-foreground text-xs">Automatically check what you can claim and generate country-specific tax forms.</span>
                  </div>
                  <CountrySelector selected={selectedCountry} onSelect={setSelectedCountry} />
                </div>
                <TaxFormPreview
                  company={companies.find(c => c.id === selectedCompany)}
                  files={uploadedFiles[selectedCompany] || []}
                  country={selectedCountry}
                />
              </div>
            </div>
          </div>
        </div>
        <CreateCompanyModal
          open={showCreateCompany}
          onClose={() => setShowCreateCompany(false)}
          onCreate={handleCreateCompany}
        />
      </main>
    </div>
  );
};

export default Index;
