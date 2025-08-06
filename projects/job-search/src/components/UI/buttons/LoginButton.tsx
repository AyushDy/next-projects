import Link from "next/link";
import { LogIn } from "lucide-react";
import Button from "@/components/UI/Button";

export default function LoginButton() {
  return (
    <Link href="/auth" className="mr-5">
      <Button variant="ghost" icon={LogIn} iconPosition="left">
        Login
      </Button>
    </Link>
  );
}
