import { createContext, useEffect, useState } from "react";
import { purchasable } from '../utils/Functionals';

const adventurersInitial = [
    {
        key: 'novice adventurer',
        icon: undefined,
        purchasableOptions: purchasable(0, 50, (curr) => { return parseInt(curr * 0.03 + 10) }),
        increase: 5,
        multiplier: 1,
    },
    {
        key: 'grave digger',
        icon: undefined,
        purchasableOptions: purchasable(0, 500, (curr) => { return parseInt(curr * 0.03 + 100) }),
        increase: 50,
        multiplier: 1,
    },
    {
        key: 'cutthroat',
        icon: undefined,
        purchasableOptions: purchasable(0, 2500, (curr) => { return parseInt(curr * 0.05 + 300) }),
        increase: 250,
        multiplier: 1,
    },
]

export const ProgressionContext = createContext();

export default function Progression(props) {
    const { children } = props;
    const [globalModifiers, setGlboalModifiers] = useState({
        timeAcceleration: 1,
        yurpiMultiplier: 1,
        adventurersMultiplier: 1,
    })
    const [yurpis, setYurpis] = useState(50);
    const [adventurers, setAdventurers] = useState(adventurersInitial);

    return (
        <ProgressionContext.Provider
            value = {{
                get: {
                    yurpis: yurpis,
                    adventurers: adventurers,
                    globalModifiers: globalModifiers,
                },
                set: {
                    yurpis: setYurpis,
                    adventurers: setAdventurers,
                    globalModifiers: setGlboalModifiers,
                },
            }}
        >
            { children }
        </ProgressionContext.Provider>
    )
}