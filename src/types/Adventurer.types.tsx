import { ResourceCollection } from "./Resource.types";

export type AdventurerTag = {
    name: string;
    color: string;
};

export type Adventurer = {
    key: string;
    tags: AdventurerTag[];
    icon: string;
    level: number;
    initialCost: Partial<ResourceCollection>;
    costIncrease: (
        currCost: Partial<ResourceCollection>
    ) => Partial<ResourceCollection>;
    AP: number;
    multiplier: number;
};
