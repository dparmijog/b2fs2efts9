import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ulid } from 'ulid';

const convertToNumber = (value: string): number => {
    const nums = value.split("").map((c) => {
        const num = c.charCodeAt(0); // Convert 'a' to 0, 'b' to 1, etc.
        return num
    })
    return nums.reduce((acc, curr) => acc + curr, 0); // Convert to a base-26 number
}

const getType = (value: number): string => {

    switch (true) {
        case value > 155:
            return "legendary";
        case value > 150:
            return "epic";
        case value > 145:
            return "rare";
        case value > 130:
            return "uncommon";
        default:
            return "common";
    }
}


const getRarityColor = (value: number): string => {

    switch (true) {
        case value > 155:
            return "#F54180"; // Legendary color
        case value > 150:
            return "#F7B750"; // Epic color
        case value > 145:
            return "#09AACD"; // Rare color;
        case value > 130:
            return "#45D483"; // Uncommon color
        default:
            return "#cccccc"; // Common color
    }
}

const getAttributeColor = (key: string) => {
    switch (key) {
        case "life":
            return "#FF5733"; // Red
        case "defense":
            return "#33FF57"; // Green
        case "attack":
            return "#3357FF"; // Blue
        case "speed":
            return "#F1C40F"; // Yellow
        case "luck":
            return "#9B59B6"; // Purple
        case "magic":
            return "#1ABC9C"; // Teal
        case "power":
            return "#E67E22"; // Orange
        case "mana":
            return "#34495E"; // Dark Blue
        default:
            return "#cccccc"; // Default color for unknown attributes
    }
}


export interface Identimon {
    id?: string;
    name: string
    birth: string,
    random: string,
    stats: Stats
}

export interface Stats {
    life: number;
    defense: number;
    attack: number;
    speed: number;
    luck: number;
    magic: number;
    power: number;
    mana: number;
    rarity: {
        value: number;
        type: string;
        color: string;
    };
}

export const createIdentimon = (id: string): Identimon => {
    const average = Math.floor((convertToNumber(id.slice(10, 24))) / 7);
    const stats: Stats = {
        life: convertToNumber(id.slice(10, 12)),
        defense: convertToNumber(id.slice(12, 14)),
        attack: convertToNumber(id.slice(14, 16)),
        speed: convertToNumber(id.slice(16, 18)),
        luck: convertToNumber(id.slice(18, 20)),
        magic: convertToNumber(id.slice(20, 22)),
        power: convertToNumber(id.slice(22, 24)),
        mana: convertToNumber(id.slice(24, 26)),
        rarity: {
            value: average,
            type: getType(average),
            color: getRarityColor(average)
        },
        

    }

    return {
        id: id,
        name: id.slice(-10),
        birth: id.slice(0, 10),
        random: id.slice(10, 26),
        stats: {
            life: stats.life,
            defense: stats.defense,
            attack: stats.attack,
            speed: stats.speed,
            luck: stats.luck,
            magic: stats.magic,
            power: stats.power,
            mana: stats.mana,
            rarity: {
                value: stats.rarity.value,
                type: stats.rarity.type,
                color: stats.rarity.color
            }
        }
    }
}

@Injectable()
export class IdentiWorldService {
    getFauna(q: number): Promise<Identimon[]> {
        return Promise.resolve(Array.from({ length: q }, (_, i) => {
            const id = ulid()
            return createIdentimon(id)
        }))
    }

    constructor(private http: HttpClient) { }
}
