"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Spinner } from "@/components/ui/LoadingSpinner";
import { useProject } from "@/lib/hooks/useProject";
import { use, useState } from "react";

export type TabTypes = "boards" | "teams" | "members" | "settings" | "overview";

export default function Layout({
  children,
  boards,
  members,
  teams,
  overview,
  settings,
  params,
}: {
  children: React.ReactNode;
  boards: React.ReactNode;
  members: React.ReactNode;
  teams: React.ReactNode;
  overview: React.ReactNode;
  settings: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [tab, setTab] = useState<TabTypes>("boards");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: project, isLoading } = useProject(slug);

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
          tab={tab}
          setTab={setTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
      <div
        className={`${
          isCollapsed ? "ml-16" : "ml-64"
        } flex-1 p-4 lg:p-20 transition-all duration-300 min-w-0 overflow-hidden`}
      >
        {tab === "boards"
          ? boards
          : tab === "teams"
          ? teams
          : tab === "members"
          ? members
          : tab === "settings"
          ? settings
          : overview}
        {children}
      </div>
    </main>
  );
}
