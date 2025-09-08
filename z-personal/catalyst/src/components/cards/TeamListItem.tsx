import Image from "next/image";
import { Team } from "../ClientTeamsPage";
import { Card } from "../ui/card";

export default function TeamListItem({
  team,
  isActive,
  setTeamId,
}: {
  team: Team;
  isActive: boolean;
  setTeamId: (teamId: string) => void;
}) {
  return (
    <Card
      className={`p-3 sm:p-2 border-none rounded-xs shadow-none cursor-pointer w-full ${
        isActive ? "bg-sky-600 text-white" : ""
      } hover:bg-muted transition-colors`}
      onClick={() => setTeamId(team.id)}
    >
      <div className="flex gap-2 sm:gap-3 items-center">
        <Image
          src={team.image}
          alt={team.name}
          width={28}
          height={28}
          className="sm:w-6 sm:h-6"
        />
        <h2 className="text-sm sm:text-base font-medium truncate">
          {team.name}
        </h2>
      </div>
    </Card>
  );
}
