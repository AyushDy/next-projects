"use client";

import { ModeToggle } from "./buttons/ThemeButton";
import { ProfileButton } from "./buttons/ProfileButton";
import { NotificationButton } from "./buttons/NotificationButton";
import Image from "next/image";
import { SearchInput } from "./SearchInput";
import { memo, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="flex items-center gap-2 py-1 pt-2 px-2 sm:px-5 md:px-15 lg:px-25 w-full transition-all duration-300">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/header-logo.png"
            alt="Catalyst Logo"
            width={120}
            height={24}
            className="sm:w-[160px] sm:h-[32px] md:w-[200px] md:h-[40px]"
          />
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-4 ml-auto">
          <SearchInput />
        </div>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <NotificationButton />
          <ModeToggle />
          <ProfileButton />
        </div>

        <div className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="px-4 py-3 space-y-3">
            <div className="w-full">
              <SearchInput />
            </div>

            <div className="flex items-center justify-around pt-2 border-t">
              <NotificationButton />
              <ModeToggle />
              <ProfileButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
