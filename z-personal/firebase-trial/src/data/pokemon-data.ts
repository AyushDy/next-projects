const pikachu = {
  name: "Pikachu",
  baseStats: {
    hp: 100,
    attack: 55,
    defense: 40,
    speed: 90,
  },
  currentStats: {
    hp: 100, 
  },
  moves: [
    { name: "Thunder shock", type: "Electric", category: "damage", power: 50 },
    { name: "Quick Attack", type: "Normal", category: "damage", power: 40, priority: 2 },
    { name: "Tail Whip", type: "Status", category: "debuff", targetStat: "defense", magnitude: 1 },
    { name: "Heal", type: "Status", category: "heal", healAmount: 30 },
  ],
};

export const moves = {
    CHARMANDER : [
            { name: "Ember", type: "Fire", category: "damage", power: 50 },
            { name: "Scratch", type: "Normal", category: "damage", power: 40 },
            { name: "Growl", type: "Status", category: "debuff", targetStat: "attack", magnitude: 1 },
            { name: "Heal", type: "Status", category: "heal", healAmount: 25 },
    ],
    PIKACHU : [
        { name: "Thunder shock", type: "Electric", category: "damage", power: 50 },
        { name: "Quick Attack", type: "Normal", category: "damage", power: 40, priority: 2 },
        { name: "Tail Whip", type: "Status", category: "debuff", targetStat: "defense", magnitude: 1 },
        { name: "Heal", type: "Status", category: "heal", healAmount: 30 },
    ]
}



const charmander = {
  name: "CHARMANDER",
  baseStats: {
    hp: 50,
    attack: 60,
    defense: 45,
    speed: 65,
  },
  currentStats: {
    hp: 50,
  },
  moves: [
    { name: "Ember", type: "Fire", category: "damage", power: 40 },
    { name: "Scratch", type: "Normal", category: "damage", power: 40 },
    { name: "Growl", type: "Status", category: "debuff", targetStat: "attack", magnitude: 1 },
    { name: "Heal", type: "Status", category: "heal", healAmount: 25 },
  ],
};


export const pikachuStats = {
  name: "PIKACHU",
  baseHealth: 50,
  health: 50,
  attack: 55,
  defense: 40,
  level : 10,
  speed: 90,
  type: "ELECTRIC",
  avatar_back: "https://img.pokemondb.net/sprites/black-white/anim/back-normal/pikachu-f.gif",
  avatar_front: "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif"
};

export const charmanderStats = {
  name: "CHARMANDER",
  baseHealth: 50,
  health: 50,
  attack: 60,
  defense: 45,
  level : 10,
  speed: 65,
  type: "FIRE",
  avatar_front: "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif",
  avatar_back: "https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmander.gif"
};