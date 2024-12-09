import { AdventurersHookData } from "../hooks/UseAdventurers";
import { GlobalModifiers } from "./Progress.types";
import { ResourceCollection } from "./Resource.types";

export type Save = {
    resources: Partial<ResourceCollection>;
    adventurers: Partial<AdventurersHookData>[];
    globalModifiers: GlobalModifiers;
    locations: Partial<Location>[];
    adventure: {
        locationKey: string;
        timePassed: number;
    } | null;
};
