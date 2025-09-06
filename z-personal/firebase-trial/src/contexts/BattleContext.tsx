"use client";

import { charmanderStats, pikachuStats } from "@/data/pokemon-data";
import { Pokemon } from "@/lib/types";
import { calculateDamage } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

export const BattleContext = createContext({});

export default function BattleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(
    pikachuStats
  );
  const [target, setTarget] = useState<Pokemon | null>(charmanderStats);

  function attack(move: any) {
    if (!currentPokemon || !target) return;
    const damage = calculateDamage(currentPokemon, target, move);
    const newHealth = target.health - damage;
    setTarget({ ...target, health: newHealth });
    setCurrentPokemon({ ...target, health: newHealth });
    setTarget(currentPokemon);
  }



  return (
    <BattleContext.Provider value={{ currentPokemon, target, attack }}>
      {children}
    </BattleContext.Provider>
  );
}

export const useBattleContext = () => useContext(BattleContext);
