import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ulid } from 'ulid';

/**
 * Converts a string to a numeric value by summing character codes
 * @param value - The string to convert
 * @returns The sum of all character codes in the string
 */
const convertToNumber = (value: string): number => {
    const nums = value.split("").map((c) => {
        const num = c.charCodeAt(0); // Convert 'a' to 0, 'b' to 1, etc.
        return num
    })
    return nums.reduce((acc, curr) => acc + curr, 0); // Convert to a base-26 number
}

/**
 * Determines the rarity type based on numeric value
 * @param value - The numeric value to evaluate
 * @returns The rarity type as a string
 */
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

/**
 * Gets the color associated with a rarity value
 * @param value - The numeric rarity value
 * @returns Hex color code for the rarity level
 */
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

/**
 * Gets the color associated with a specific attribute
 * @param key - The attribute name
 * @returns Hex color code for the attribute
 */
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

/**
 * Interface representing an Identimon creature
 * @interface Identimon
 */
export interface Identimon {
    /** Unique identifier for the Identimon */
    id?: string;
    /** Display name of the Identimon */
    name: string;
    /** Birth timestamp of the Identimon */
    birth: string;
    /** Random identifier used for stat generation */
    random: string;
    /** Complete stats object for the Identimon */
    stats: Stats;
}

/**
 * Interface defining all stats for an Identimon
 * @interface Stats
 */
export interface Stats {
    /** Health points of the Identimon */
    life: number;
    /** Defensive capability */
    defense: number;
    /** Attack power */
    attack: number;
    /** Movement speed */
    speed: number;
    /** Luck factor affecting various outcomes */
    luck: number;
    /** Magical power */
    magic: number;
    /** Physical power */
    power: number;
    /** Mana points for magical abilities */
    mana: number;
    /** Rarity information including value, type, and color */
    rarity: {
        /** Numeric value determining rarity level */
        value: number;
        /** String representation of rarity (common, uncommon, rare, epic, legendary) */
        type: string;
        /** Hex color code associated with the rarity */
        color: string;
    };
}

/**
 * Creates a new Identimon from a given ID
 * Generates stats based on portions of the ID string
 * @param id - The unique identifier to base the Identimon on
 * @returns A complete Identimon object with generated stats
 */
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

/**
 * Service responsible for managing Identimon creatures in the IdentiWorld
 * Handles generation and retrieval of Identimon fauna
 * @class IdentiWorldService
 */
@Injectable()
export class IdentiWorldService {
    /**
     * Generates a specified number of random Identimon creatures
     * @param q - The quantity of Identimon to generate
     * @returns Promise resolving to an array of generated Identimon
     */
    getFauna(q: number): Promise<Identimon[]> {
        return Promise.resolve(Array.from({ length: q }, (_, i) => {
            const id = ulid()
            return createIdentimon(id)
        }))
    }

    /**
     * Constructor that injects the HttpClient dependency
     * @param http - Angular HTTP client for making API requests
     */
    constructor(private http: HttpClient) { }
}
