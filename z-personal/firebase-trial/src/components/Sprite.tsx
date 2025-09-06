import { Pokemon } from "@/lib/types";

export default function Sprite({
  pokemon,
  size = "sm",
  position = "right"
}: {
  pokemon: Pokemon;
  size?: "sm" | "lg";
  position?: "left" | "right";
}) {
    const sizeClass = size === "sm" ? "w-30 h-30" : "w-40 h-40";
    const positionClass = position === "left" ? "justify-start" : "justify-end";

  return (
    <div className={`w-1/3 ${positionClass} h-full flex items-end `}>
      <div
        className={`${sizeClass}`}
      >
        <img
          src={position !== "left"? pokemon.avatar_back : pokemon.avatar_front}
          alt={pokemon.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
