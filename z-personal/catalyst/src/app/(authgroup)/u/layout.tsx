"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Settings, Group, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!session) {
    return <div>Please log in</div>;
  }

  const paths = [
    {
      name: "Profile",
      href: `/u/${session?.user.id}`,
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      name: "Teams",
      href: `/u/${session?.user.id}/teams`,
      icon: <Group className="mr-2 h-4 w-4" />,
    },
    {
      name: "Settings",
      href: `/u/${session?.user.id}/settings`,
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      <h2 className="font-bold text-lg sm:text-xl mb-4 px-2">
        Personal Settings
      </h2>
      <nav className="flex-1">
        <ul className="space-y-1 sm:space-y-2">
          {paths.map((path) => (
            <li key={path.name}>
              <Link
                href={path.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full flex items-center rounded-xs p-3 sm:p-2 text-sm sm:text-base transition-colors ${
                  path.href === pathName
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent/50"
                }`}
              >
                {path.icon}
                <h3 className="font-semibold">{path.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:hidden bg-background border-b p-4 flex items-center justify-between">
        <h2 className="font-bold text-lg">Personal Settings</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-background border-r z-50 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1"
              >
                <X size={20} />
              </Button>
            </div>
            <NavigationContent />
          </div>
        </>
      )}

      <div className="hidden md:flex w-64 lg:w-72 bg-background border-r p-4 sm:p-6">
        <NavigationContent />
      </div>

      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden">{children}</div>
    </div>
  );
}
