import { damage, Pokemon } from "./types";

export function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  move: damage
) {
  const levelBonus = (attacker.level * 2) / 5 + 2;
  const power = move.power;
  const statEffect = (attacker.attack / defender.defense);
  const damage = Math.floor(((levelBonus * power * statEffect) / 50 + 2) * (Math.random() * (0.15) + 0.85));
  return damage;
}
