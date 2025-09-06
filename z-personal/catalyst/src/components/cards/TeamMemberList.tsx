import React from "react";
import { Card } from "../ui/card";
import { AddMembersButton } from "../buttons/AddMembersButton";
import { Team } from "../ClientTeamsPage";
import ProfileIcon from "../ui/ProfileIcon";
import { Crown } from "lucide-react";
import { TeamsMenuButton } from "../buttons/TeamsMenuButton";
import { useAuthContext } from "../context/AuthContextProvider";

const TeamMemberList = ({ currentTeam }: { currentTeam: Team | null }) => {
  const { session } = useAuthContext();

  return (
    <Card className="flex flex-col rounded-xs gap-4 p-4">
      <div className="flex gap-10">
        <h1 className="text-2xl font-sans font-bold">{currentTeam ? currentTeam.name : "None"}</h1>
        {session?.user?.id === currentTeam?.teamLead?.id && (
          <AddMembersButton team={currentTeam} />
        )}
      </div>
      <h1>Members</h1>
      {currentTeam && (
        <div className="flex flex-col gap-2 justify-start">
          {currentTeam?.members.map((member) => (
            <Card className={`p-2 pr-4 rounded-xs w-fit`} key={member.id}>
              <div className={`flex items-center gap-2 `}>
                <ProfileIcon user={member.user} />
                <span>{member.user.name}</span>
                {member.user.id === currentTeam?.teamLead.id && (
                  <span>
                    <Crown className="text-yellow-500 h-4 w-4" />
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      <div className="relative">
        <div className="absolute bottom-4 right-1">
          <TeamsMenuButton teamId={currentTeam?.id} />
        </div>
      </div>
    </Card>
  );
};

export default TeamMemberList;
