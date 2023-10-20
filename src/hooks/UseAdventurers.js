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
        initialCost: 100,
        costIncrease: (currCost) => { return parseInt(currCost * 0.03 + 10)},
        incPerSecPerLevel: 5,
        multiplier: 1,
        acceleration: 1,
        duration: 5,
        hasSendAuto: false,
        isUnlocked: true,
    },
    {
        key: 'hunter',
        tags: [adventurerTags.ranged],
        icon: undefined,
        level: 0,
        initialCost: 800,
        costIncrease: (currCost) => { return parseInt(currCost * 0.04 + 80)},
        incPerSecPerLevel: 40,
        multiplier: 1,
        acceleration: 1,
        duration: 15,
        hasSendAuto: false,
        isUnlocked: true,
    },
    {
        key: 'mage',
        tags: [adventurerTags.magic],
        icon: undefined,
        level: 0,
        initialCost: 5000,
        costIncrease: (currCost) => { return parseInt(currCost * 0.05 + 500)},
        incPerSecPerLevel: 250,
        multiplier: 1,
        acceleration: 1,
        duration: 30,
        hasSendAuto: false,
        isUnlocked: true,
    },
    {
        key: 'knight',
        tags: [adventurerTags.melee],
        icon: undefined,
        level: 0,
        initialCost: 1000000,
        costIncrease: (currCost) => { return parseInt(currCost * 0.05 + 100000)},
        incPerSecPerLevel: 50000,
        multiplier: 1,
        acceleration: 1,
        duration: 60,
        hasSendAuto: false,
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
        initialCost: 100000000,
        costIncrease: (currCost) => { return parseInt(currCost * 0.05 + 10000000)},
        incPerSecPerLevel: 5000000,
        multiplier: 1,
        acceleration: 1,
        duration: 90,
        hasSendAuto: false,
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
        initialCost: 10000000000,
        costIncrease: (currCost) => { return parseInt(currCost * 0.05 + 1000000000)},
        incPerSecPerLevel: 500000000,
        multiplier: 1,
        acceleration: 1,
        duration: 120,
        hasSendAuto: false,
        isUnlocked: true,
    },
]

export const useAdventurers = (globalModifiers, yurpisState) => {
    const adventurers = adventurersInitial.map(el => UseAdventurer(el, globalModifiers, yurpisState));

    function getCumulatedAP() {
        return adventurers.reduce(adventurer => {
            return adventurer.getAP();
        })
    }

    return {
        data: adventurers,
        getCumulatedAP,
    };
}