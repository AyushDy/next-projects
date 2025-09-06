import { useBattleContext } from "@/contexts/BattleContext";
import { Move as MoveType } from "@/lib/types";

export default function Move({ move }: { move: MoveType }) {
  const { attack, setMove } = useBattleContext() as any;

  function handleAttack(move2: MoveType) {
    console.log("Attacking with move:", move2);
    attack(move2);
  }

  return (
    <div
      key={move.name}
      className="p-2 w-1/2 h-1/2 transition-all duration-300 cursor-pointer hover:text-black flex items-center px-10"
      onClick={() => handleAttack(move)}
    >
      <span className="font-semibold">{move.name}</span>
    </div>
  );
}
