import { useRef } from "react";
import { UseAdventurer } from "./UseAdventurer";

const adventurerTags = {
    melee: {
        name: 'melee',
        color: '#baa761',
    },
    ranged: {
        name: 'ranged',
        color: '#8fd16b',
    },
    magic: {
        name: 'magic',
        color: '#55a5d4',
    },
    support: {
        name: 'support',
        color: '#c4689b',
    },
}

const adventurersInitial = [
    {
        key: 'squire',
        tags: [adventurerTags.melee],
        icon: undefined,
        level: 0,
        initialCost: {
            yurpis: {
                amount: 100,
            },
        },
        costIncrease: (currCost) => { 
            return {
                yurpis: {
                    amount: parseInt(currCost.yurpis.amount + currCost.yurpis.amount * 0.03 + 10)
                }
            }
        },
        AP: 5 * Math.pow(10, 2),
        multiplier: 1,
        isUnlocked: true,
    },
    {
        key: 'hunter',
        tags: [adventurerTags.ranged],
        icon: undefined,
        level: 0,
        initialCost: {
            yurpis: {
                amount: 800,
            },
        },
        costIncrease: (currCost) => { 
            return {
                yurpis: {
                    amount: parseInt(currCost.yurpis.amount + currCost.yurpis.amount * 0.04 + 80)
                }
            }
        },
        AP: 4 * Math.pow(10, 3),
        multiplier: 1,
        isUnlocked: true,
    },
    {
        key: 'mage',
        tags: [adventurerTags.magic],
        icon: undefined,
        level: 0,
        initialCost: {
            yurpis: {
                amount: 5000,
            },
        },
        costIncrease: (currCost) => { 
            return {
                yurpis: {
                    amount: parseInt(currCost.yurpis.amount + currCost.yurpis.amount * 0.05 + 500)
                }
            }
        },
        AP: 25 * Math.pow(10, 3),
        multiplier: 1,
        isUnlocked: true,
    },
    {
        key: 'knight',
        tags: [adventurerTags.melee],
        icon: undefined,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 6),
            },
        },
        costIncrease: (currCost) => { 
            return {
                yurpis: {
                    amount: parseInt(currCost.yurpis + currCost.yurpis * 0.05 + Math.pow(10, 5))
                }
            }
        },
        AP: 5 * Math.pow(10, 6),
        multiplier: 1,
        isUnlocked: true,
    },
    {
        key: 'rouge',
        tags: [
            adventurerTags.melee,
            adventurerTags.ranged,
        ],
        icon: undefined,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 8),
            },
        },
        costIncrease: (currCost) => { 
            return {
                yurpis: {
                    amount: parseInt(currCost.yurpis + currCost.yurpis * 0.05 + Math.pow(10, 6))
                }
            }
        },
        AP: 5 * Math.pow(10, 8),
        multiplier: 1,
        isUnlocked: true,
    },
    {
        key: 'priest',
        tags: [
            adventurerTags.magic,
            adventurerTags.support,
        ],
        icon: undefined,
        level: 0,
        initialCost: {
            yurpis: {
                amount: Math.pow(10, 10),
            },
        },
        costIncrease: (currCost) => { 
            return {
                yurpis: {
                    amount: parseInt(currCost.yurpis + currCost.yurpis * 0.05 + Math.pow(10, 8))
                }
            }
        },
        AP: 5 * Math.pow(10, 10),
        multiplier: 1,
        isUnlocked: true,
    },
]

export const useAdventurers = (globalModifiers, resources) => {
    const adventurers = adventurersInitial.map(el => UseAdventurer(el, globalModifiers, resources));
    const state = useRef();
    state.current = {
        adventurers
    }

    function getCumulatedAP() {
        let ap = 0;
        for (let adventurer of state.current.adventurers) {
            ap += adventurer.getModifiedAP()
        }
        return ap;
    }

    return {
        data: adventurers,
        getCumulatedAP,
    };
}