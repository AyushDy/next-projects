import Link from "next/link";
import Button from "@/components/UI/Button";

export default function ViewDetails({ id }: { id: string }) {
  return (
    <Link href={`/jobs/${id}`} className="block">
      <Button
        variant="primary"
        size="sm"
        iconPosition="left"
        className="min-h-[36px] sm:min-h-[32px] text-xs sm:text-sm px-3 sm:px-4"
      >
        Details
      </Button>
    </Link>
  );
}
