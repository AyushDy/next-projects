import Link from "next/link";
import { Settings } from "lucide-react";
import Button from "@/components/UI/Button";

export default function AdminPanelButton() {
  return (
    <Link href="/admin" className="mr-5">
      <Button variant="ghost" icon={Settings} iconPosition="left">
        Admin Panel
      </Button>
    </Link>
  );
}
