"use client";

import { Spinner } from "./ui/LoadingSpinner";
import { useEffect, useState } from "react";
import TeamListItem from "./cards/TeamListItem";
import TeamMemberList from "./cards/TeamMemberList";
import { AddTeamToProjectButton } from "./buttons/AddTeamToProjectButton";
import { useGetTeamsByProject } from "@/lib/hooks/useTeams";

export type Team = {
  id: string;
  name: string;
  image: string;
  members: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }[];
  teamLead: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};

export default function ClientTeamsPage({ slug }: { slug: string }) {
  const { data: teams, isLoading } = useGetTeamsByProject(slug);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <Spinner size="md" />
        Loading...
      </div>
    );
  }

  if (!teams) {
    return <div>No teams found.</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">Teams in {slug}</h1>
        <AddTeamToProjectButton projectSlug={slug} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10 w-full">
        <div className="flex flex-col w-full lg:w-auto lg:min-w-[300px] max-h-48 sm:max-h-60 lg:max-h-80 overflow-y-auto">
          {teams.map((team: Team) => (
            <TeamListItem
              key={team.id}
              team={team}
              setTeamId={setCurrentTeamId}
              isActive={currentTeamId === team.id}
            />
          ))}
        </div>
        {currentTeamId && (
          <div className="flex-1 w-full">
            <TeamMemberList currentTeamId={currentTeamId} />
          </div>
        )}
      </div>
    </div>
  );
}
