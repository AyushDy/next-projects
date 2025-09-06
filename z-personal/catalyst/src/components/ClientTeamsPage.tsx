"use client";

import { useTeams } from "@/lib/hooks/useTeams";
import { Spinner } from "./ui/LoadingSpinner";
import { useEffect, useState } from "react";
import TeamListItem from "./cards/TeamListItem";
import TeamMemberList from "./cards/TeamMemberList";
import { AddTeamToProjectButton } from "./buttons/AddTeamToProjectButton";

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
  const { data: teams, isLoading } = useTeams(slug);
  const [currentTeam, setCurrentTeam] = useState<null | Team>(null);

  useEffect(() => {
    if (teams && teams.length > 0) {
      if (currentTeam) {
        const updatedCurrentTeam = teams.find(
          (team) => team.id === currentTeam.id
        );
        if (updatedCurrentTeam) {
          setCurrentTeam(updatedCurrentTeam); 
        } else {
          setCurrentTeam(teams[0]); 
        }
      } else {
        setCurrentTeam(teams[0]);
      }
    }
  }, [teams, currentTeam?.id]);

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
      <div className="flex gap-2 justify-between items-center mb-4">
        <h1>Teams in {slug}</h1>
        <AddTeamToProjectButton projectSlug={slug} />
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-4 w-fit">
          {teams.map((team) => (
            <TeamListItem
              key={team.id}
              team={team}
              setTeam={setCurrentTeam}
              isActive={currentTeam?.id === team.id}
            />
          ))}
        </div>
        <TeamMemberList currentTeam={currentTeam} />
      </div>
    </div>
  );
}
