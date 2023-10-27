import { createContext, useState } from "react";
import { useAdventurers } from "../hooks/UseAdventurers";
import { useLocationList } from "../hooks/UseLocationList";
import { useResources } from "../hooks/UseResources";

export const ProgressionContext = createContext();

export default function Progression(props) {
    const { children } = props;
    const [globalModifiers, setGlboalModifiers] = useState({
        accelerator: {
            time: 1,
            location: 1,
        },
        multiplier: {
            location: 1,
            AP: 1,
        },
    })
    const resources = useResources();
    const adventurers = useAdventurers(globalModifiers, resources);
    const locations = useLocationList(adventurers, globalModifiers, resources);

    return (
        <ProgressionContext.Provider
            value = {{
                get: {
                    globalModifiers: globalModifiers,
                    locations: locations,
                },
                set: {
                    globalModifiers: setGlboalModifiers,
                },
                resources,
                adventurers: adventurers,
            }}
        >
            { children }
        </ProgressionContext.Provider>
    )
}