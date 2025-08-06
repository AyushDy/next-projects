import Link from "next/link";
import { User } from "lucide-react";
import Button from "@/components/UI/Button";

export default function ProfileButton() {
  return (
    <Link href="/profile" className="mr-5">
      <Button variant="ghost" icon={User} iconPosition="left">
        Profile
      </Button>
    </Link>
  );
}
