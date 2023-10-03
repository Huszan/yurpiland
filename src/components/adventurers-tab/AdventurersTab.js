import { useContext, useEffect } from 'react';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';
import { ProgressionContext } from '../../utils/Progression';
import IntervalBar from '../interval-bar/IntervalBar';
import './AdventurersTab.scss';

export default function AdventurersTab() {
    const progress = useContext(ProgressionContext);

    const adventurerComponents = progress.get.adventurers.map((adventurer, i) => {
        const canLoad = adventurer.purchasableOptions.getCount() > 0;
        const onLoad = () => {
            onFinishedAdventure(adventurer);
        }
        const canAfford = adventurer.purchasableOptions.getCost() <= progress.get.yurpis;

        return (
            <div className='adventurer-block' key={ adventurer.key }>
                <h3>{firstLetterToUpperCase(adventurer.key)}</h3>
                <span>Level { adventurer.purchasableOptions.getCount() }</span>
                <span>Cost: { adventurer.purchasableOptions.getCost() }</span>
                <span>Income: { getAdventurerIncome(adventurer) } (+{adventurer.increase})</span>
                <button onClick={ () => { buyAdventurer(i) }} disabled={ !canAfford }>BUY</button>
                <IntervalBar isLoading={canLoad} onLoad={onLoad} />
            </div>
        )
    })

    function getAdventurerIncome(adventurer) {
        return adventurer.purchasableOptions.getCount() 
            * adventurer.increase 
            * adventurer.multiplier 
            * progress.get.globalModifiers.adventurersMultiplier 
            * progress.get.globalModifiers.yurpiMultiplier;
    }

    function onFinishedAdventure(adventurer) {
        let income = getAdventurerIncome(adventurer);
        progress.set.yurpis(prev => prev + income);
    }

    function buyAdventurer(i) {
        const adventurers = progress.get.adventurers;
        if (!adventurers[i] || progress.get.yurpis < adventurers[i].purchasableOptions.getCost()) {
            console.warn('Not enough yurpis');
            return;
        }
        else {
            let cost = adventurers[i].purchasableOptions.getCost();
            let adventurersClone = [...adventurers];
            adventurersClone[i].purchasableOptions.buy();
            progress.set.yurpis(prev => prev - cost);
            progress.set.adventurers(adventurersClone);
        }
    }

    return (
        <div id='adventurers-tab'>
            { adventurerComponents }
        </div>
    )
}