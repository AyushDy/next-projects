"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const paths = [
  { name: "Dashboard", href: "/" },
  { name: "Repositories", href: "/repo" },
  { name: "Chats", href: "/chat" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="md:hidden fixed top-12 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-background border border-border hover:bg-accent transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 md:w-fit z-40 
          bg-background border-r border-border md:border-r-0
          transform transition-transform duration-300 ease-in-out md:transform-none
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          md:py-10
        `}
      >
        <div className="h-16 md:h-0" />

        <div className="flex flex-col px-4 md:px-0 pt-10">
          {paths.map((path) => (
            <Link
              key={path.name}
              href={path.href}
              onClick={closeMobileMenu}
              className={`
                w-full py-3 px-4 md:py-2 md:pl-5 md:pr-12 rounded-md md:rounded-none
                transition-colors duration-200
                ${
                  path.href === pathname
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }
              `}
            >
              {path.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
