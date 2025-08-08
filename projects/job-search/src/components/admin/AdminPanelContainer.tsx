"use client";

import { useState } from "react";
import JobList from "./JobsList";
import AddJobFormWrapper from "./AddJobFormWrapper";
import UsersList from "./UsersList";

export default function AdminPanelContainer() {
  const [tab, setTab] = useState<"jobs" | "users" | "add-job">("jobs");

  const handleTabChange = (newTab: "jobs" | "users" | "add-job") => {
    setTab(newTab);
  };

  const tabs = [
    { id: "jobs", label: "Manage Jobs" },
    { id: "users", label: "Manage Users" },
    { id: "add-job", label: "Add Job" },
  ] as const;

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br   p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage jobs, users, and system settings
          </p>
        </div>

        <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-lg p-2 mb-8 shadow-lg">
          <nav className="flex space-x-2">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-300 ${
                  tab === tabItem.id
                    ? "bg-primary text-primary-foreground shadow-md transform scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => handleTabChange(tabItem.id as typeof tab)}
              >
                {tabItem.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-card/20 backdrop-blur-md border border-border/30 rounded-lg p-8 shadow-xl">
          {tab === "jobs" && <JobList />}
          {tab === "users" && <UsersList />}
          {tab === "add-job" && <AddJobFormWrapper />}
        </div>
      </div>
    </div>
  );
}
