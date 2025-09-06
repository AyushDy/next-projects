"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {User, Settings, Group} from "lucide-react"


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathName = usePathname();

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
    }
  ];

  return (
    <div className="min-h-screen min-w-screen flex">
      <div className="w-64 bg-background p-4">
        <div className="flex flex-col">
          <h2 className="font-bold">Personal Settings</h2>
          <ul className="mt-4 space-y-2">
            {paths.map((path) => (
              <li key={path.name}>
                <Link
                  href={path.href}
                  className={`w-full flex items-center rounded-xs p-2 ${
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
        </div>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
