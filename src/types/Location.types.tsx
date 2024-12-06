import { MinMax } from "./Math.types";
import { ResourceCollection } from "./Resource.types";

export type Location = {
    key: string;
    desc: string;
    optimalAP: MinMax;
    baseTimeToFinish: number; // in seconds
    baseDrop: ResourceCollection;
    multiplier: number;
    acceleration: number;
    position: [number, number];
    hasAutoSendBought: boolean;
    hasAutoSendOn: boolean;
    icon: string;
    iconSelected: string;
    bg: string;
};
