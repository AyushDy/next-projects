import Link from "next/link";
import { Eye } from "lucide-react";
import Button from "@/components/UI/Button";

export default function ViewDetails({ job_id }: { job_id: string }) {
  return (
    <Link href={`/jobs/${job_id}`}>
      <Button variant="primary" size="sm" icon={Eye} iconPosition="left">
        View Details
      </Button>
    </Link>
  );
}
