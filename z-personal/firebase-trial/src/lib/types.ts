export type Pokemon = {
    name: string;
    baseHealth: number;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    type: string;
    level : number;
    avatar_front: string,
    avatar_back:string
};


export type Move = {
    name: string;
    type: string;
    category: "damage" | "status";
    power: number;
    accuracy: number;
    priority: number;
    targetStat?: "attack" | "defense" | "speed";
    healAmount?: number;
}

export type damage = {
    name: string;
    type: string;
    category: "damage";
    power: number;
    accuracy: number;
    priority: number;
    targetStat?: "attack" | "defense" | "speed";
    healAmount?: number;
}

export type debuff = {
    name: string;
    type: string;
    category: "debuff";
    targetStat: "attack" | "defense" | "speed";
    magnitude: number;
}

export type buff = {
    name: string;
    type: string;
    category: "buff";
    targetStat: "attack" | "defense" | "speed";
    magnitude: number;
}