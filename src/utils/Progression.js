import { createContext, useEffect, useState } from "react";
import { purchasable } from '../utils/Functionals';

const adventurersInitial = [
    {
        key: 'novice adventurer',
        icon: undefined,
        purchasableOptions: purchasable(0, 50, (curr) => { return parseInt(curr * 0.03 + 10) }),
        incPerSecPerLevel: 2,
        multiplier: 1,
        acceleration: 1,
        duration: 5,
        lastAdventureStart: undefined,
        hasSendAuto: false,
    },
    {
        key: 'grave digger',
        icon: undefined,
        purchasableOptions: purchasable(0, 500, (curr) => { return parseInt(curr * 0.03 + 100) }),
        incPerSecPerLevel: 20,
        multiplier: 1,
        acceleration: 1,
        duration: 15,
        lastAdventureStart: undefined,
        hasSendAuto: false,
    },
    {
        key: 'cutthroat',
        icon: undefined,
        purchasableOptions: purchasable(0, 2500, (curr) => { return parseInt(curr * 0.05 + 500) }),
        incPerSecPerLevel: 100,
        multiplier: 1,
        acceleration: 1,
        duration: 30,
        currentAdventureStartTime: undefined,
        hasSendAuto: false,
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

    function getAdventureIncome(adventurer) {
        return adventurer.purchasableOptions.getCount() 
        * adventurer.incPerSecPerLevel 
        * adventurer.duration
        * adventurer.multiplier 
        * globalModifiers.adventurersMultiplier 
        * globalModifiers.yurpiMultiplier
    }

    function getAdventureDurationWithModifiers(adventurer) {
        return adventurer.duration * adventurer.acceleration * globalModifiers.timeAcceleration * 1000;
    }

    function getAdventureProgress(adventurer) {
        if (!adventurer.currentAdventureStartTime) return 0;
        return (new Date().getTime() - adventurer.currentAdventureStartTime.getTime()) / getAdventureDurationWithModifiers(adventurer);
    }

    function changeAdventurer(i, props) {
        setAdventurers(prev => {
            let clone = [...prev];
            clone[i] = {
                ...clone[i],
                ...props,
            }
            return clone;
        })
    }

    function sendOnAdventure(adventurer, i) {
        if (adventurer.currentAdventureStartTime) return;
        changeAdventurer(i, {
            currentAdventureStartTime: new Date(),
        })
        setTimeout(() => {
            setYurpis(prev => prev + getAdventureIncome(adventurer));
            changeAdventurer(i, {
                currentAdventureStartTime: undefined,
            })
        }, getAdventureDurationWithModifiers(adventurer))
    }

    useEffect(() => {
        for (let i = 0; i < adventurers.length; i++) {
            const adventurer = adventurers[i];
            if (
                (!adventurer.currentAdventureStartTime && adventurer.hasSendAuto && adventurer.purchasableOptions.getCount() > 0) 
                || getAdventureProgress(adventurer) > 100 ) {
                sendOnAdventure(adventurer, i);
            }
        }
    }, [adventurers])

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
                changeAdventurer,
                getAdventureDurationWithModifiers,
                getAdventureIncome,
                getAdventureProgress,
                sendOnAdventure,
            }}
        >
            { children }
        </ProgressionContext.Provider>
    )
}