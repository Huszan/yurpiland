import { useState } from "react";
import YurpisIco from "../resources/images/icons/yurpi-icon.png";
import WoodIco from "../resources/images/icons/wood-icon.png";
import { ResourceCollection } from "../types/Resource.types";

const initialResources: ResourceCollection = {
    yurpis: {
        amount: 100,
        multiplier: 1,
        icon: YurpisIco,
    },
    wood: {
        amount: 0,
        multiplier: 1,
        icon: WoodIco,
    },
};

export type ResourcesHookData = {
    data: ResourceCollection;
    setData: React.Dispatch<React.SetStateAction<ResourceCollection>>;
    isAffordable: (cost: Partial<ResourceCollection>) => boolean;
    change: (change: Partial<ResourceCollection>, type: "dec" | "inc") => void;
};

export const useResources = (): ResourcesHookData => {
    const [resources, setResources] =
        useState<ResourceCollection>(initialResources);

    function isAffordable(resourceCosts: Partial<ResourceCollection>) {
        let affordable = true;
        Object.entries(resourceCosts).forEach(([key, val]) => {
            if (val?.amount === undefined)
                throw new Error("Resources must have their cost defined!");
            if (resources[key].amount < val.amount) {
                affordable = false;
                return;
            }
        });
        return affordable;
    }

    function change(resources: Partial<ResourceCollection>, type: string) {
        if (!isAffordable(resources) && type === "dec")
            throw new Error(
                "Cannot deduct more resources than there is available!"
            );
        setResources((prev) => {
            const resourcesClone = JSON.parse(JSON.stringify(prev));
            Object.entries(resources).forEach(([key, val]) => {
                if (!val?.amount)
                    throw new Error("Resources must have their cost defined!");
                if (type === "inc") resourcesClone[key].amount += val.amount;
                if (type === "dec") resourcesClone[key].amount -= val.amount;
            });
            return resourcesClone;
        });
    }

    return {
        data: resources,
        setData: setResources,
        isAffordable,
        change,
    };
};
