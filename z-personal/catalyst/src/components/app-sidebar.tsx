"use client";

import { TabTypes } from "@/app/(authgroup)/[slug]/layout";
import {
  Book,
  Users,
  Settings,
  BadgeInfoIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

const items = [
  {
    title: "boards",
    icon: Book,
  },
  {
    title: "overview",
    icon: BadgeInfoIcon,
  },
  {
    title: "teams",
    icon: Users,
  },
  {
    title: "members",
    icon: Users,
  },
  {
    title: "settings",
    icon: Settings,
  },
];

export function AppSidebar({
  tab,
  setTab,
  isCollapsed,
  setIsCollapsed,
}: {
  tab: TabTypes;
  setTab: (tab: TabTypes) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}) {
  return (
    <div className="h-full w-full">
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="px-2 space-y-1">
        {items.map((item) => (
          <Button
            variant={tab === item.title ? "default" : "ghost"}
            key={item.title}
            className={`flex w-full gap-3 rounded-lg px-3 py-2 text-sm ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
            onClick={() => setTab(item.title as TabTypes)}
            title={isCollapsed ? item.title : undefined}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && <span className="capitalize">{item.title}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
}
