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
      className={`p-3 sm:p-4 md:p-3 border-none rounded-xs shadow-none cursor-pointer w-full min-w-0 ${
        isActive ? "bg-sky-600 text-white" : ""
      } hover:bg-muted transition-colors`}
      onClick={() => setTeamId(team.id)}
    >
      <div className="flex gap-3 sm:gap-4 items-center min-w-0">
        <Image
          src={team.image}
          alt={team.name}
          width={32}
          height={32}
          className="w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0 rounded-full"
        />
        <h2 className="text-sm sm:text-base md:text-sm lg:text-base font-medium truncate min-w-0">
          {team.name}
        </h2>
      </div>
    </Card>
  );
}
