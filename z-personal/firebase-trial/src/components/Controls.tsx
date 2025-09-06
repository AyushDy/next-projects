"use client";

import { moves } from "@/data/pokemon-data";
import { Pokemon } from "@/lib/types";
import { useState } from "react";
import Fight from "./battle-actions/Fight";

 type Options = "FIGHT" | "BAG" | "POKEMON" | "RUN";


const options: Options[] = [
    "FIGHT",
    "BAG",
    "POKEMON",
    "RUN"
]



export default function Controls({ pokemon }: { pokemon: Pokemon }) {
  const [action, setAction] = useState<"IDLE" | "FIGHT" | "BAG"| "POKEMON" | "RUN">("IDLE")


  return (
    <div className="flex justify-between w-full h-full">
      <div className=" h-full w-2/3 bg-sky-700 border-4 border-gray-500 rounded-l-md">
         {action === "FIGHT" ? <Fight name={pokemon.name} /> : null}
      </div>
      <div className="w-1/3 flex flex-wrap bg-white h-full border-4 border-gray-500 rounded-r-md">
         {options.map((option) => (
            <div
               onClick={() => setAction(option as Options)} key={option} className="w-1/2 h-1/2 p-10 flex text-4xl font-bold items-center justify-between cursor-pointer hover:bg-gray-200">
               <span>{option}</span>
            </div>
         ))}
      </div>
    </div>
  );
}
