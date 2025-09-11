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
    <Card className="flex flex-col rounded-xs gap-4 sm:gap-5 p-4 sm:p-5 md:p-6 w-full">
      {isLoading ? (
        <div className="flex gap-2 items-center justify-center py-8">
          <Spinner size="md" />
          <span className="text-sm sm:text-base">Loading...</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-10 items-start sm:items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold truncate">
              {currentTeam ? currentTeam.name : "None"}
            </h1>
            {session?.user?.id === currentTeam?.teamLead?.id &&
              (currentTeam ? <AddMembersButton team={currentTeam} /> : null)}
          </div>
          <div className="border-t pt-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3">
              Members
            </h2>
            {currentTeam && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {currentTeam?.members.map((member) => (
                  <Card
                    className="p-3 sm:p-4 rounded-xs w-full hover:bg-muted/50 transition-colors"
                    key={member.id}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <ProfileIcon user={member.user} />
                      <span className="text-sm sm:text-base font-medium truncate flex-1">
                        {member.user.name}
                      </span>
                      {member.user.id === currentTeam?.teamLead.id && (
                        <Crown className="text-yellow-500 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <TeamsMenuButton teamId={currentTeam?.id} />
          </div>
        </>
      )}
    </Card>
  );
};

export default TeamMemberList;
