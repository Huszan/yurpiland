import { UseLocation } from "./UseLocation"
import CastlePng from "../resources/images/castle2.png"
import CastleSelectedPng from "../resources/images/castle2_selected.png"
import ForestPng from "../resources/images/forest.png"
import ForestSelectedPng from "../resources/images/forest_selected.png"
import { useState } from "react"

const locationsInitial = [
    {
        key: 'city square',
        desc: 'Send brave andventurers to assist helpless citizens in their daily tasks. Better prepare some ladders to get them kitties off the trees.',
        optimalAP: {
            min: Math.pow(10, 2),
            max: Math.pow(10, 6),
        },
        baseTimeToFinish: 15, // seconds
        baseDrop: [
            {
                key: 'yurpis',
                amount: 1,
            }
        ],
        multiplier: 1,
        acceleration: 1,
        position: [17, 27],
        hasAutoSendBought: false,
        hasAutoSendOn: false,
        icon: CastlePng,
        iconSelected: CastleSelectedPng,
    },
    {
        key: 'forest',
        desc: 'Small forest with a lot of potential for adventuring! We can collect resources here to expand our guild.',
        optimalAP: {
            min: Math.pow(10, 5),
            max: Math.pow(10, 10),
        },
        baseTimeToFinish: 30, // seconds
        baseDrop: [
            {
                key: 'yurpis',
                amount: 0.2,
            },
            {
                key: 'wood',
                amount: 0.8,
            },
        ],
        multiplier: 1,
        acceleration: 1,
        position: [50, 50],
        hasAutoSendBought: false,
        hasAutoSendOn: false,
        icon: ForestPng,
        iconSelected: ForestSelectedPng,
    },
]

export const useLocationList = (ap, globalModifiers) => {
    const locationList = locationsInitial.map(location => UseLocation(location, ap, globalModifiers));
    const [ selected, setSelected ] = useState(locationList[0]);

    return {
        data: locationList,
        get: {
            selected,
        },
        set: {
            selected: setSelected,
        }
    };
}