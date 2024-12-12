import { LocationHookData, UseLocation } from "./UseLocation";
import CastlePng from "../resources/images/castle2.webp";
import CastleSelectedPng from "../resources/images/castle2_selected.webp";
import ForestPng from "../resources/images/forest.webp";
import ForestSelectedPng from "../resources/images/forest_selected.webp";
import { useState } from "react";
import CityLandscapeImg from "../resources/images/city-landscape.webp";
import ForestLandscapeImg from "../resources/images/forest-landscape-2.webp";
import { Location } from "../types/Location.types";
import { ResourcesHookData } from "./UseResources";
import { AdventurersHookData } from "./UseAdventurers";
import { GlobalModifiers } from "../types/Progress.types";

const locationsInitial: Location[] = [
    {
        key: "city square",
        desc: "Send brave andventurers to assist helpless citizens in their daily tasks. Better prepare some ladders to get them kitties off the trees.",
        optimalAP: {
            min: Math.pow(10, 2),
            max: Math.pow(10, 6),
        },
        baseTimeToFinish: 15,
        baseDrop: {
            yurpis: {
                amount: 1,
            },
        },
        multiplier: 1,
        acceleration: 1,
        position: [17, 27],
        hasAutoSendBought: false,
        hasAutoSendOn: false,
        icon: CastlePng,
        iconSelected: CastleSelectedPng,
        bg: CityLandscapeImg,
    },
    {
        key: "forest",
        desc: "Small forest with a lot of potential for adventuring! We can collect resources here to expand our guild.",
        optimalAP: {
            min: Math.pow(10, 5),
            max: Math.pow(10, 10),
        },
        baseTimeToFinish: 60,
        baseDrop: {
            yurpis: {
                amount: 0.8,
            },
            wood: {
                amount: 3.2,
            },
        },
        multiplier: 1,
        acceleration: 1,
        position: [50, 50],
        hasAutoSendBought: false,
        hasAutoSendOn: false,
        icon: ForestPng,
        iconSelected: ForestSelectedPng,
        bg: ForestLandscapeImg,
    },
];

export type LocationListHookData = {
    data: LocationHookData[];
    get: {
        selected: LocationHookData;
    };
    set: {
        selected: React.Dispatch<React.SetStateAction<LocationHookData>>;
    };
};

export const useLocationList = (
    adventurers: AdventurersHookData,
    globalModifiers: GlobalModifiers,
    resources: ResourcesHookData
): LocationListHookData => {
    const locationList = locationsInitial.map((location) =>
        UseLocation(location, adventurers, globalModifiers, resources)
    );
    const [selected, setSelected] = useState(locationList[0]);

    return {
        data: locationList,
        get: {
            selected,
        },
        set: {
            selected: setSelected,
        },
    };
};
