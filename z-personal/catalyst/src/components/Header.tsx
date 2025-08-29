

import { ModeToggle } from "./buttons/ThemeButton";
import { ProfileButton } from "./buttons/ProfileButton";
import { NotificationButton } from "./buttons/NotificationButton";
import Image from "next/image";
import { SearchInput } from "./SearchInput";

export default function Header() {

    return (
        <header className="flex items-center gap-2 py-1 pt-2 px-5 md:px-15 lg:px-25 w-full">
            <Image src="/header-logo.png" alt="Catalyst Logo" width={200} height={40} />
            <SearchInput />
            <NotificationButton />
            <ModeToggle />
            <ProfileButton />
        </header>
    )
}