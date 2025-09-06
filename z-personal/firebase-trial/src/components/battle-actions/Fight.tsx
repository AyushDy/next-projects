import { moves } from "@/data/pokemon-data";
import Move from "./Move";
import {Move as MoveType} from "@/lib/types";

export default function Fight({ name }: { name: string }) {

  return (
    <div className="flex flex-wrap text-white h-full text-4xl items-center justify-center">
      {moves[name as keyof typeof moves].map((move, index) => (
        <Move key={move.name} move={move as MoveType} />
      ))}
    </div>
  );
}
