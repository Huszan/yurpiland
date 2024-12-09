import { PropsWithChildren, useState } from "react";
import { useAdventurers } from "../hooks/UseAdventurers";
import { useLocationList } from "../hooks/UseLocationList";
import { useResources } from "../hooks/UseResources";
import { useAdventure } from "../hooks/UseAdventure";
import {
    ProgressionContext,
    ProgressionContextValue,
} from "./Progression.context";
import { GlobalModifiers } from "../types/Progress.types";

export default function Progression(props: PropsWithChildren) {
    const { children } = props;
    const [globalModifiers, setGlboalModifiers] = useState<GlobalModifiers>({
        accelerator: {
            time: 1,
            location: 1,
        },
        multiplier: {
            location: 1,
            AP: 1,
        },
    });
    const resources = useResources();
    const adventurers = useAdventurers(globalModifiers, resources);
    const locations = useLocationList(adventurers, globalModifiers, resources);
    const adventure = useAdventure(locations.get.selected, resources);

    const progress = {
        get: {
            globalModifiers: globalModifiers,
        },
        set: {
            globalModifiers: setGlboalModifiers,
        },
        resources,
        adventurers,
        locations,
        adventure,
    } as ProgressionContextValue;

    return (
        <ProgressionContext.Provider value={progress}>
            {children}
        </ProgressionContext.Provider>
    );
}
