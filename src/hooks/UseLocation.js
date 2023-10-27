import { useState } from "react"

export const UseLocation = (initial, adventurers, globalModifiers, resources) => {
    const [location] = useState(initial);
    const getAP = adventurers.getCumulatedAP;

    /**
     * @returns base time with modifiers in ms
     */
    function getAdventureTime() {
        return location.baseTimeToFinish *
        location.acceleration *
        globalModifiers.accelerator.time *
        globalModifiers.accelerator.location *
        1000;
    }

    function getDrop() {
        return location.baseDrop.map(el => {
            const rsc = resources.get.filter(resource => resource.key === el.key)[0];
            return {
                ...el,
                amount: (
                    el.amount *
                    (getAP() ? (getAP() / 20) : 0) *
                    location.multiplier *
                    globalModifiers.multiplier.location *
                    rsc.multiplier
                )
            }
        })
    }

    const baseChance = 50;

    function getBonusChance() {
        let max = location.optimalAP.max - location.optimalAP.min;
        let curr = getAP() - location.optimalAP.min;
        if (curr <= 0) return 0;
        let chance = curr / max * (100 - baseChance);
        return chance;
    }

    function getChanceToSuccess() {
        if (getAP() < location.optimalAP.min) return 0;
        const chance = baseChance + getBonusChance();
        return chance;
    }

    return {
        ...location,
        getAdventureTime,
        getDrop,
        getChanceToSuccess,
    }
}