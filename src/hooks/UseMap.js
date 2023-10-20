import { useState } from "react"

export const UseMap = (initial, ap, globalModifiers) => {
    const [map, setMap] = useState(initial);

    /**
     * @returns base time with modifiers in ms
     */
    function getAdventureTime() {
        return map.baseTimeToFinish *
        map.acceleration *
        globalModifiers.acceleration.time *
        globalModifiers.acceleration.adventure *
        1000;
    }

    function getDrop() {
        return map.baseDrop.map(el => {
            return {
                ...el,
                amount: (
                    el.amount *
                    (ap / 100) *
                    map.multiplier *
                    globalModifiers.multiplier.map *
                    globalModifiers.multiplier[el.key]
                )
            }
        })
    }

    function getChanceToSuccess() {
        let max = map.optimalAP.max - map.optimalAP.min;
        let curr = ap - map.optimalAP.min;
        if (curr <= 0) return 0;
        let chance = curr / max;
        return chance;
    }

    return {
        ...map,
        getAdventureTime,
        getDrop,
        getChanceToSuccess,
    }
}