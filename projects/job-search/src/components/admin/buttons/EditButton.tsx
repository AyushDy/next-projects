import { Edit } from "lucide-react";
import Button from "@/components/UI/Button";

export default function EditButton({ jobId }: { jobId: string }) {
  const handleEdit = () => {
    console.log("Edit job:", jobId);
    // TODO: Implement edit functionality
  };

  return (
    <Button onClick={handleEdit} variant="secondary" size="sm" icon={Edit}>
      Edit
    </Button>
  );
}
