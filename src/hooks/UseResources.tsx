import { useState } from "react";
import YurpisIco from "../resources/images/icons/yurpi-icon.png";
import WoodIco from "../resources/images/icons/wood-icon.png";
import { ResourceCollection } from "../types/ResourceCollection";

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

export const useResources = () => {
    const [resources, setResources] = useState(initialResources);

    function isAffordable(resourceCosts: ResourceCollection) {
        let affordable = true;
        Object.entries(resourceCosts).forEach(([key, val]) => {
            if (resources[key].amount < val.amount) {
                affordable = false;
                return;
            }
        });
        return affordable;
    }

    function change(resources: ResourceCollection, type: string) {
        if (!isAffordable(resources) && type === "dec") return 0;
        setResources((prev) => {
            const resourcesClone = JSON.parse(JSON.stringify(prev));
            Object.entries(resources).forEach(([key, val]) => {
                if (type === "inc") resourcesClone[key].amount += val.amount;
                if (type === "dec") resourcesClone[key].amount -= val.amount;
            });
            return resourcesClone;
        });
        return 1;
    }

    return {
        data: resources,
        setData: setResources,
        isAffordable,
        change,
    };
};
