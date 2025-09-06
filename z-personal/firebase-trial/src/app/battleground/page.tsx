"use client";

import Controls from "@/components/Controls";
import Sprite from "@/components/Sprite";
import StatusBar from "@/components/statusbar";
import { useBattleContext } from "@/contexts/BattleContext";



export default function Page() {
    const { currentPokemon, target } = useBattleContext() as any;

  return (
    <div className="w-screen h-screen bg-black ">
        <div className=" w-full h-2/7 flex items-center justify-between px-20">
        <StatusBar pokemon={target}/>
        <Sprite pokemon={target} size="sm" position="left"/>
        </div>
        <div className=" w-full h-2/5 flex items-center justify-between px-20">
          <Sprite pokemon={currentPokemon} size="lg" />
          <StatusBar pokemon={currentPokemon} />
        </div>
        <div className=" w-full h-3/10">
        <Controls pokemon={currentPokemon} />
        </div>
    </div>
  );
}
