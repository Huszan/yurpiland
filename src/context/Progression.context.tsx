import { createContext } from "react";
import { ResourcesHookData } from "../hooks/UseResources";
import { LocationListHookData } from "../hooks/UseLocationList";
import { AdventurersHookData } from "../hooks/UseAdventurers";
import { AdventureHookData } from "../hooks/UseAdventure";
import { GlobalModifiers } from "../types/Progress.types";

export type ProgressionContextValue = null | {
    get: {
        globalModifiers: GlobalModifiers;
    };
    set: {
        globalModifiers: React.Dispatch<React.SetStateAction<GlobalModifiers>>;
    };
    resources: ResourcesHookData;
    adventurers: AdventurersHookData;
    locations: LocationListHookData;
    adventure: AdventureHookData;
};

export const ProgressionContext = createContext<ProgressionContextValue>(null);
