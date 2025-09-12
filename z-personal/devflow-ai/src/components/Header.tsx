import Image from "next/image";
import { ProfileButton } from "./buttons/ProfileButton";

export default function Header() {
  return (
    <div className="flex items-center text-3xl text-primary font-semibold md:px-20 pt-2">
      <Image src="/images/logo.png" alt="Logo" height={50} width={50} />
      evFlow AI
      <div className="ml-auto">
        <ProfileButton />
      </div>
    </div>
  );
}
