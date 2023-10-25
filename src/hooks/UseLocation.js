import { useState } from "react"

export const UseLocation = (initial, ap, globalModifiers) => {
    const [location] = useState(initial);

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
            return {
                ...el,
                amount: (
                    el.amount *
                    (ap / 100) *
                    location.multiplier *
                    globalModifiers.multiplier.map *
                    globalModifiers.multiplier[el.key]
                )
            }
        })
    }

    const baseChance = 50;

    function getBonusChance() {
        let max = location.optimalAP.max - location.optimalAP.min;
        let curr = ap - location.optimalAP.min;
        if (curr <= 0) return 0;
        let chance = curr / max * (100 - baseChance);
        return chance;
    }

    function getChanceToSuccess() {
        if (ap < location.optimalAP.min) return 0;
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