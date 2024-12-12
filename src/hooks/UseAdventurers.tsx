import { useRef } from "react";
import { AdventurerHookData, UseAdventurer } from "./UseAdventurer";
import SquireImg from "../resources/images/characters/squire_240.webp";
import HunterImg from "../resources/images/characters/hunter_240.webp";
import MageImg from "../resources/images/characters/mage_240.webp";
import KnightImg from "../resources/images/characters/knight_240.webp";
import RogueImg from "../resources/images/characters/rogue_240.webp";
import PriestImg from "../resources/images/characters/priest_240.webp";
import BerserkerImg from "../resources/images/characters/berserker_240.webp";
import BardImg from "../resources/images/characters/bard_240.webp";
import DruidImg from "../resources/images/characters/druid_240.webp";
import { Adventurer } from "../types/Adventurer.types";
import { ResourcesHookData } from "./UseResources";
import { GlobalModifiers } from "../types/Progress.types";

const adventurerTags = {
    melee: {
        name: "melee",
        color: "#baa761",
    },
    ranged: {
        name: "ranged",
        color: "#8fd16b",
    },
    magic: {
        name: "magic",
        color: "#55a5d4",
    },
    support: {
        name: "support",
        color: "#c4689b",
    },
};

const adventurersInitial: Adventurer[] = [
    {
        key: "squire",
        tags: [adventurerTags.melee],
        icon: SquireImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: 100,
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.03 +
                            10
                    ),
                },
            };
        },
        AP: 5 * Math.pow(10, 2),
        multiplier: 1,
    },
    {
        key: "hunter",
        tags: [adventurerTags.ranged],
        icon: HunterImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: 800,
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.04 +
                            80
                    ),
                },
            };
        },
        AP: 4 * Math.pow(10, 3),
        multiplier: 1,
    },
    {
        key: "mage",
        tags: [adventurerTags.magic],
        icon: MageImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: 5000,
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.05 +
                            500
                    ),
                },
            };
        },
        AP: 25 * Math.pow(10, 3),
        multiplier: 1,
    },
    {
        key: "knight",
        tags: [adventurerTags.melee],
        icon: KnightImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 6),
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.05 +
                            Math.pow(10, 5)
                    ),
                },
            };
        },
        AP: 5 * Math.pow(10, 6),
        multiplier: 1,
    },
    {
        key: "rogue",
        tags: [adventurerTags.melee, adventurerTags.ranged],
        icon: RogueImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 8),
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.05 +
                            Math.pow(10, 6)
                    ),
                },
            };
        },
        AP: 5 * Math.pow(10, 8),
        multiplier: 1,
    },
    {
        key: "priest",
        tags: [adventurerTags.magic, adventurerTags.support],
        icon: PriestImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 10),
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.05 +
                            Math.pow(10, 8)
                    ),
                },
            };
        },
        AP: 5 * Math.pow(10, 10),
        multiplier: 1,
    },
    {
        key: "berserker",
        tags: [adventurerTags.melee],
        icon: BerserkerImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 14),
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.05 +
                            Math.pow(10, 12)
                    ),
                },
            };
        },
        AP: 5 * Math.pow(10, 14),
        multiplier: 1,
    },
    {
        key: "bard",
        tags: [adventurerTags.support],
        icon: BardImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 18),
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.05 +
                            Math.pow(10, 16)
                    ),
                },
            };
        },
        AP: 5 * Math.pow(10, 18),
        multiplier: 1,
    },
    {
        key: "druid",
        tags: [adventurerTags.magic],
        icon: DruidImg,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 24),
            },
        },
        costIncrease: (currCost) => {
            return {
                yurpis: {
                    amount: Math.floor(
                        currCost.yurpis!.amount +
                            currCost.yurpis!.amount * 0.05 +
                            Math.pow(10, 22)
                    ),
                },
            };
        },
        AP: 5 * Math.pow(10, 24),
        multiplier: 1,
    },
];

export type AdventurersHookData = {
    data: AdventurerHookData[];
    getCumulatedAP: () => number;
};

export const useAdventurers = (
    globalModifiers: GlobalModifiers,
    resources: ResourcesHookData
): AdventurersHookData => {
    const adventurers = adventurersInitial.map((el) =>
        UseAdventurer(el, globalModifiers, resources)
    );
    const state = useRef<undefined | { adventurers: AdventurerHookData[] }>();
    state.current = {
        adventurers,
    };

    function getCumulatedAP() {
        if (!state.current) return 0;
        let ap = 0;
        for (const adventurer of state.current.adventurers) {
            ap += adventurer.modifiedAP;
        }
        return ap;
    }

    return {
        data: adventurers,
        getCumulatedAP,
    };
};
