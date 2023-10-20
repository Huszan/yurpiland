import { createContext, useState } from "react";
import { useAdventurers } from "../hooks/UseAdventurers";
import { useMapList } from "../hooks/UseMapList";

export const ProgressionContext = createContext();

export default function Progression(props) {
    const { children } = props;
    const [globalModifiers, setGlboalModifiers] = useState({
        accelerator: {
            time: 1,
            adventurer: 1,
            map: 1,
        },
        multiplier: {
            yurpi: 1,
            adventurer: 1,
            map: 1,
        },
    })
    const [yurpis, setYurpis] = useState(100);
    const maps = useMapList(100, globalModifiers);
    const adventurers = useAdventurers(globalModifiers, [yurpis, setYurpis]);

    return (
        <ProgressionContext.Provider
            value = {{
                get: {
                    yurpis: yurpis,
                    globalModifiers: globalModifiers,
                    maps,
                },
                set: {
                    yurpis: setYurpis,
                    globalModifiers: setGlboalModifiers,
                },
                adventurers: adventurers.data,
            }}
        >
            { children }
        </ProgressionContext.Provider>
    )
}