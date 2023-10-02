import { createContext, useState } from "react";
import { purchasable } from '../utils/Functionals';

const adventurersInitial = [
    {
        key: 'novice adventurer',
        icon: undefined,
        purchasableOptions: purchasable(0, 50, (curr) => { return parseInt(curr * 0.01 + 10) }),
        increase: 1,
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

    function yurpisPerTick() {
        let amount = 0;
        for (let adventurer of adventurers) {
            amount += getAdventurerIncome(adventurer)
        }
        return amount;
    }

    function getAdventurerIncome(adventurer) {
        return adventurer.purchasableOptions.getCount() 
            * adventurer.increase 
            * adventurer.multiplier 
            * globalModifiers.adventurersMultiplier 
            * globalModifiers.yurpiMultiplier;
    }


    return (
        <ProgressionContext.Provider
            value = {{
                get: {
                    yurpis: yurpis,
                    adventurers: adventurers
                },
                set: {
                    yurpis: setYurpis,
                    adventurers: setAdventurers,
                },
                getAdventurerIncome,
            }}
        >
            { children }
        </ProgressionContext.Provider>
    )
}