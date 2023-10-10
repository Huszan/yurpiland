import { UseAdventurer } from "./UseAdventurer";

const adventurersInitial = [
    {
        key: 'novice adventurer',
        icon: undefined,
        level: 0,
        initialCost: 50,
        costIncrease: (currCost) => { return parseInt(currCost * 0.03 + 10)},
        incPerSecPerLevel: 2,
        multiplier: 1,
        acceleration: 1,
        duration: 5,
        lastAdventureStart: undefined,
        hasSendAuto: false,
    },
    {
        key: 'grave digger',
        icon: undefined,
        level: 0,
        initialCost: 500,
        costIncrease: (currCost) => { return parseInt(currCost * 0.04 + 50)},
        incPerSecPerLevel: 20,
        multiplier: 1,
        acceleration: 1,
        duration: 15,
        lastAdventureStart: undefined,
        hasSendAuto: false,
    },
    {
        key: 'cutthroat',
        icon: undefined,
        level: 0,
        initialCost: 2500,
        costIncrease: (currCost) => { return parseInt(currCost * 0.05 + 250)},
        incPerSecPerLevel: 100,
        multiplier: 1,
        acceleration: 1,
        duration: 30,
        currentAdventureStartTime: undefined,
        hasSendAuto: false,
    },
]

export const useAdventurers = (globalModifiers, yurpisState) => {
    const adventurers = adventurersInitial.map(el => UseAdventurer(el, globalModifiers, yurpisState));

    return adventurers;
}