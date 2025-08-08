import Link from "next/link";
import { Eye } from "lucide-react";
import Button from "@/components/UI/Button";

export default function ViewDetails({ id }: { id: string }) {
  return (
    <Link href={`/jobs/${id}`}>
      <Button variant="primary" size="sm" icon={Eye} iconPosition="left">
        View Details
      </Button>
    </Link>
  );
}
