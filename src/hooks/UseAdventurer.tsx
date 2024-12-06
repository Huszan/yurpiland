import { useState } from "react";
import { Adventurer } from "../types/Adventurer.types";
import { ResourcesHookData } from "./UseResources";
import { ResourceCollection } from "../types/Resource.types";

export type AdventurerHookData = Adventurer & {
    modifiedAP: number;
    cost: Partial<ResourceCollection>;
    canAfford: boolean;
    buy: () => void;
    set: React.Dispatch<React.SetStateAction<Adventurer>>;
};

export const UseAdventurer = (
    initial: Adventurer,
    globalModifiers,
    resources: ResourcesHookData
): AdventurerHookData => {
    const [adventurer, setAdventurer] = useState<Adventurer>(initial);

    function getCost(): Partial<ResourceCollection> {
        let cost = adventurer.initialCost;
        for (let i = 0; i < adventurer.level; i++) {
            cost = adventurer.costIncrease(cost);
        }
        return cost;
    }

    function getModifiedAP() {
        return (
            adventurer.level *
            adventurer.AP *
            adventurer.multiplier *
            globalModifiers.multiplier.AP
        );
    }

    function canAfford() {
        return resources.isAffordable(getCost());
    }

    function buy() {
        const cost = getCost();
        if (!adventurer || !canAfford()) {
            throw new Error("Not enough yurpis to buy this");
        } else {
            resources.change(cost, "dec");
            setAdventurer((prev) => {
                return {
                    ...prev,
                    level: prev.level + 1,
                };
            });
        }
    }

    return {
        ...adventurer,
        modifiedAP: getModifiedAP(),
        cost: getCost(),
        canAfford: canAfford(),
        buy,
        set: setAdventurer,
    };
};
