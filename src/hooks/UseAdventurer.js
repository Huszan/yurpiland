import { useState, useEffect } from "react"

export const UseAdventurer = (initial, globalModifiers, [yurpis, setYurpis]) => {
    const [adventurer, setAdventurer] = useState(initial);

    function getCost() {
        let cost = adventurer.initialCost;
        for (let i = 0; i < adventurer.level; i++) {
            cost += adventurer.costIncrease(cost);
        }
        return cost;
    }

    function getAdventureIncome() {
        return adventurer.level
        * adventurer.incPerSecPerLevel 
        * adventurer.duration
        * adventurer.multiplier 
        * globalModifiers.multiplier.adventurer
        * globalModifiers.multiplier.yurpi
    }

    function getAdventureDurationWithModifiers() {
        return adventurer.duration * adventurer.acceleration * globalModifiers.accelerator.time * 1000;
    }

    function getAdventureProgress() {
        if (!adventurer.currentAdventureStartTime) return 0;
        return (new Date().getTime() - adventurer.currentAdventureStartTime.getTime()) / getAdventureDurationWithModifiers(adventurer);
    }

    function update(props) {
        setAdventurer(prev => {
            return {
                ...prev,
                ...props,
            }
        })
    }

    function buy() {
        let cost = getCost();
        if (!adventurer || yurpis < cost) {
            return 'Not enough yurpis to buy this';
        }
        else {
            setYurpis(prev => prev - cost);
            setAdventurer(prev => {
                return {
                    ...prev,
                    level: prev.level + 1,
                }
            })
        }
    }

    function sendOnAdventure() {
        if (adventurer.currentAdventureStartTime) return;
        update({
            currentAdventureStartTime: new Date(),
        })
        setTimeout(() => {
            setYurpis(prev => prev + getAdventureIncome(adventurer));
            update({
                currentAdventureStartTime: undefined,
            })
        }, getAdventureDurationWithModifiers(adventurer))
    }

    useEffect(() => {
        if (
            (!adventurer.currentAdventureStartTime && adventurer.hasSendAuto && adventurer.level > 0) 
            || getAdventureProgress(adventurer) > 100 ) {
            sendOnAdventure();
        }
    }, [adventurer])

    return {
        ...adventurer,
        getCost,
        getAdventureIncome,
        getAdventureDurationWithModifiers,
        getAdventureProgress,
        update,
        buy,
        sendOnAdventure,
    }
}