import Image from "next/image";
import { Team } from "../ClientTeamsPage";
import { Card } from "../ui/card";

export default function TeamListItem({ team, isActive, setTeam }: { team: Team, isActive: boolean, setTeam: (team: Team) => void }) {

    return (
    <Card className={`p-2 rounded-xs shadow-none cursor-pointer w-full ${isActive ? 'bg-sky-600 text-white' : ''}`} onClick={()=>setTeam(team)}>
      <div className="flex gap-2">
        <Image src={team.image} alt={team.name} width={24} height={24} />
        <h2>{team.name}</h2>
      </div>
    </Card>
  );
}
