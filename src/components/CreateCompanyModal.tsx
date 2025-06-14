
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateCompanyModal = ({ open, onClose, onCreate }: Props) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Company name is required.");
      return;
    }
    onCreate(name.trim());
    setName("");
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Enter company name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            className="mb-2"
          />
          {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
          <DialogFooter>
            <Button type="submit" variant="default">Create</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompanyModal;
