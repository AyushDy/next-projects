"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Spinner } from "@/components/ui/LoadingSpinner";
import { useProject } from "@/lib/hooks/useProject";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export type TabTypes = "boards" | "teams" | "members" | "settings" | "overview";

export default function TabLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; tab: string }>;
}) {
  const { slug, tab } = use(params);
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: project, isLoading } = useProject(slug);

  const handleTabChange = (newTab: TabTypes) => {
    router.push(`/${slug}/${newTab}`);
  };

  return (
    <main className="flex h-full">
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } h-full fixed left-0 top-12 bg-background border-r transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-4 pt-4 h-16">
          {!isCollapsed && (
            <h2 className="text-xl font-semibold text-primary truncate">
              {isLoading ? <Spinner /> : project?.name}
            </h2>
          )}
        </div>
        <AppSidebar
          tab={tab as TabTypes}
          setTab={handleTabChange}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
      <div
        className={`${
          isCollapsed ? "ml-16" : "ml-64"
        } flex-1 p-4 lg:p-20 transition-all duration-300 min-w-0 overflow-hidden`}
      >
        {children}
      </div>
    </main>
  );
}
