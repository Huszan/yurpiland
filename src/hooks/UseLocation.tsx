import { useState } from "react";
import { ResourceCollection } from "../types/Resource.types";
import { Location } from "../types/Location.types";
import { ResourcesHookData } from "./UseResources";

export type LocationHookData = Location & {
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
    getAdventureTime: () => number;
    getDrop: () => ResourceCollection;
    getChanceToSuccess: () => number;
};

export const UseLocation = (
    initial: Location,
    adventurers,
    globalModifiers,
    resources: ResourcesHookData
): LocationHookData => {
    const [location, setLocation] = useState<Location>(initial);
    const getAP = adventurers.getCumulatedAP;

    /**
     * @returns base time with modifiers in ms
     */
    function getAdventureTime() {
        return (
            location.baseTimeToFinish *
            location.acceleration *
            globalModifiers.accelerator.time *
            globalModifiers.accelerator.location *
            1000
        );
    }

    function getDrop() {
        const drop: ResourceCollection = {};
        Object.entries(location.baseDrop).forEach(([key, el]) => {
            const rsc = resources.data[key];
            drop[key] = {
                ...el,
                amount:
                    el.amount *
                    (getAP() ? getAP() / 20 : 0) *
                    location.multiplier *
                    globalModifiers.multiplier.location *
                    rsc.multiplier!,
            };
        });
        return drop;
    }

    const baseChance = 50;

    function getBonusChance() {
        const max = location.optimalAP.max - location.optimalAP.min;
        const curr = getAP() - location.optimalAP.min;
        if (curr <= 0) return 0;
        const chance = (curr / max) * (100 - baseChance);
        return chance;
    }

    function getChanceToSuccess() {
        if (getAP() < location.optimalAP.min) return 0;
        const chance = baseChance + getBonusChance();
        return chance;
    }

    return {
        ...location,
        setLocation,
        getAdventureTime,
        getDrop,
        getChanceToSuccess,
    };
};
