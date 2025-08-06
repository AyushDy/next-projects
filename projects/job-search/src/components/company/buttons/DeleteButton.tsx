
import { Trash2 } from "lucide-react";
import Button from "@/components/UI/Button";
import { useState } from "react";
import ConfirmationModal from "@/components/UI/reusable/ConfirmationModal";
import { deleteJobCompany } from "@/lib/admin-client/company-utils";
import Toast from "@/components/UI/loaders/Toast";

export default function DeleteButton({ jobId , handleDelete}: { jobId: string, handleDelete: (jobId: string) => Promise<void> }) {
  const [modalOpen, setModalOpen] = useState(false);


  async function deleteJob(): Promise<{ success: boolean }> {
    try {
      await handleDelete(jobId);
      setModalOpen(false);
      return { success: true };
    } catch (error) {
      setModalOpen(false);
      return { success: false };
    }
  }

  return (
    <>
    {modalOpen && (
      <ConfirmationModal
        onCancel={() => setModalOpen(false)}
        onConfirm={deleteJob}
      />
    )}
      <Button onClick={() => setModalOpen(true)} variant="danger" title="delete job" size="sm" icon={Trash2} className="w-fit">
        Delete
      </Button>
    </>
  );
}
