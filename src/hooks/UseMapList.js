import { UseMap } from "./UseMap"
import CastlePng from "../resources/images/castle2.png"
import CastleSelectedPng from "../resources/images/castle2_selected.png"
import { useState } from "react"

const mapsInitial = [
    {
        key: 'city square',
        desc: 'Send brave andventurers to assist helpless citizens in their daily tasks. Better prepare some ladders to get them kitties of the trees.',
        optimalAP: {
            min: 100,
            max: 100000,
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
        position: ['50%', '50%'],
        hasAutoSendBought: false,
        hasAutoSendOn: false,
        icon: CastlePng,
        iconSelected: CastleSelectedPng,
    },
    {
        key: 'forest',
        desc: 'Send brave andventurers to assist helpless citizens in their daily tasks. Better prepare some ladders to get them kitties of the trees.',
        optimalAP: {
            min: 100,
            max: 100000,
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
        position: ['20%', '20%'],
        hasAutoSendBought: false,
        hasAutoSendOn: false,
        icon: CastlePng,
        iconSelected: CastleSelectedPng,
    },
]

export const useMapList = (ap, globalModifiers) => {
    const mapList = mapsInitial.map(map => UseMap(map, ap, globalModifiers));
    const [ selected, setSelected ] = useState(mapList[0].key);

    return {
        data: mapList,
        get: {
            selected,
        },
        set: {
            selected: setSelected,
        }
    };
}