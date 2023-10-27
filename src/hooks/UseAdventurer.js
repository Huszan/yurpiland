import { useState, useEffect } from "react"

export const UseAdventurer = (initial, globalModifiers, resources) => {
    const [adventurer, setAdventurer] = useState(initial);

    function getCost() {
        let cost = adventurer.initialCost;
        for (let i = 0; i < adventurer.level; i++) {
            cost = adventurer.costIncrease(cost);
        }
        return cost;
    }

    function getModifiedAP() {
        return adventurer.level
        * adventurer.AP 
        * adventurer.multiplier 
        * globalModifiers.multiplier.AP
    }

    function canAfford(cost) {
        return resources.isAffordable(cost ? cost : getCost());
    }

    function buy() {
        let cost = getCost();
        if (!adventurer || !canAfford(cost)) {
            throw new Error('Not enough yurpis to buy this');
        }
        else {
            let success = resources.reduct(cost);
            if (success) {
                setAdventurer(prev => {
                    return {
                        ...prev,
                        level: prev.level + 1,
                    }
                })
            }
        }
    }

    return {
        get: adventurer,
        set: setAdventurer,
        getModifiedAP,
        getCost,
        canAfford,
        buy,
    }
}