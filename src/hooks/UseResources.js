import { useState } from 'react';
import YurpisIco from '../resources/images/yurpi.png';

const initialResources = [
    {
        key: 'yurpis',
        amount: 100,
        multiplier: 1,
        icon: YurpisIco,
    },
    {
        key: 'wood',
        amount: 0,
        multiplier: 1,
        icon: null,
    },
]

export const useResources = () => {
    const [resources, setResources] = useState(initialResources);

    function isAffordable(cost) {
        let affordable = true;
        Object.keys(cost).forEach(key => {
            if (resources.find(el => el.key === key).amount < cost[key]) {
                affordable = false;
                return;
            }
        })
        return affordable;
    }

    function reduct(cost) {
        if (!isAffordable(cost)) return null;
        setResources(prev => {
            let resourcesClone = [...prev];
            Object.keys(cost).forEach(key => {
                resourcesClone.filter(el => {
                    if (el.key === key) {
                        el.amount -= cost[key];
                    }
                });
            })
            return resourcesClone;
        })
        return 1;
    }

    return {
        get: resources,
        set: setResources,
        isAffordable,
        reduct,
    }
}