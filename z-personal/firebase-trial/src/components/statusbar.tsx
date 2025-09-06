import { Pokemon } from "@/lib/types";

export default function StatusBar({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="bg-sky-800 w-1/4 px-5 py-2 flex flex-col items-center justify-between rounded-lg rounded-tl-4xl rounded-br-4xl">
      <div className="flex justify-between w-full items-center">
        <div className="text-white text-3xl">{pokemon.name}</div>
        <div className="text-white text-lg">Lv{pokemon.level}</div>
      </div>

      <div className="w-full flex justify-end">
        <div className="flex items-center border-black border-4 bg-black h-3 rounded-lg p-1">
          <span className="text-orange-500 font-extrabold ">HP</span>
          <div className="w-40 h-2 bg-red-500 rounded-lg ">
            <div
              className="bg-green-500 h-full border rounded-lg transition-all duration-300"
              style={{
                width: `${(pokemon.health / pokemon.baseHealth) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full items-center">
        <div className="text-white text-sm">{pokemon.type}</div>
        <div className="text-white mx-1 rounded-lg ml-auto">
          {pokemon.health}/{pokemon.baseHealth}
        </div>
      </div>
    </div>
  );
}
