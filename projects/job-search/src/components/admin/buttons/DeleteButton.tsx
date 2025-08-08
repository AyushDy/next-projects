import { Trash2 } from "lucide-react";
import Button from "@/components/UI/Button";
import { useState } from "react";
import ConfirmationModal from "@/components/UI/modals/ConfirmationModal";
import { deleteJobAdmin } from "@/lib/admin-client/admin-utils";

export default function DeleteButton({
  jobId,
  handleDelete,
}: {
  jobId: string;
  handleDelete: (jobId: string) => Promise<void>;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  async function handleClick() {
    try {
      const response = await handleDelete(jobId);
      setModalOpen(false);
      return { success: true };
    } catch (error) {
      setModalOpen(false);
      console.error("Error deleting job:", error);
    }
    return { success: false };
  }

  return (
    <>
      {modalOpen && (
        <ConfirmationModal
          onCancel={() => setModalOpen(false)}
          onConfirm={handleClick}
        />
      )}
      <Button
        onClick={() => setModalOpen(true)}
        variant="danger"
        size="sm"
        icon={Trash2}
        className="w-fit"
      >
        Delete
      </Button>
    </>
  );
}
