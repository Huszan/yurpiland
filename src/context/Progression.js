import { createContext, useEffect, useState } from "react";
import { useAdventurers } from "../hooks/UseAdventurers";

export const ProgressionContext = createContext();

export default function Progression(props) {
    const { children } = props;
    const [globalModifiers, setGlboalModifiers] = useState({
        timeAcceleration: 1,
        yurpiMultiplier: 1,
        adventurersMultiplier: 1,
    })
    const [yurpis, setYurpis] = useState(50);
    const adventurers = useAdventurers(globalModifiers, [yurpis, setYurpis]);

    return (
        <ProgressionContext.Provider
            value = {{
                get: {
                    yurpis: yurpis,
                    globalModifiers: globalModifiers,
                },
                set: {
                    yurpis: setYurpis,
                    globalModifiers: setGlboalModifiers,
                },
                adventurers
            }}
        >
            { children }
        </ProgressionContext.Provider>
    )
}