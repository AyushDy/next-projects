import React from "react";
import { Card } from "../ui/card";
import { AddMembersButton } from "../buttons/AddMembersButton";
import ProfileIcon from "../ui/ProfileIcon";
import { Crown } from "lucide-react";
import { TeamsMenuButton } from "../buttons/TeamsMenuButton";
import { useAuthContext } from "../context/AuthContextProvider";
import { Spinner } from "../ui/LoadingSpinner";
import { useGetTeamDetails } from "@/lib/hooks/useTeams";

const TeamMemberList = ({ currentTeamId }: { currentTeamId: string }) => {
  const { session } = useAuthContext();
  const { data: currentTeam, isLoading } = useGetTeamDetails(currentTeamId);

  return (
    <Card className="flex flex-col rounded-xs gap-3 sm:gap-4 p-3 sm:p-4">
      {isLoading ? (
        <div className="flex gap-2">
          <Spinner size="md" />
          Loading...
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-start sm:items-center">
            <h1 className="text-xl sm:text-2xl font-sans font-bold">
              {currentTeam ? currentTeam.name : "None"}
            </h1>
            {session?.user?.id === currentTeam?.teamLead?.id &&
              (currentTeam ? <AddMembersButton team={currentTeam} /> : null)}
          </div>
          <h1 className="text-base sm:text-lg font-semibold">Members</h1>
          {currentTeam && (
            <div className="flex flex-col gap-2 justify-start">
              {currentTeam?.members.map((member) => (
                <Card
                  className="p-2 sm:p-3 rounded-xs w-full sm:w-fit sm:mr-20"
                  key={member.id}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <ProfileIcon user={member.user} />
                    <span className="text-sm sm:text-base truncate">
                      {member.user.name}
                    </span>
                    {member.user.id === currentTeam?.teamLead.id && (
                      <span>
                        <Crown className="text-yellow-500 h-4 w-4 flex-shrink-0" />
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="relative sm:ml-20">
            <div className="absolute bottom-1 right-1">
              <TeamsMenuButton teamId={currentTeam?.id} />
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default TeamMemberList;
