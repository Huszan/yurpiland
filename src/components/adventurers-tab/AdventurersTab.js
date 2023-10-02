import { useContext, useState } from 'react';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';
import { ProgressionContext } from '../../utils/Progression';
import './AdventurersTab.scss';

export default function AdventurersTab() {
    const progress = useContext(ProgressionContext);

    const adventurerComponents = progress.get.adventurers.map((adventurer, i) => {
        return (
            <div className='adventurer-block' key={ adventurer.key }>
                <h3>{firstLetterToUpperCase(adventurer.key)}</h3>
                <span>count: { adventurer.purchasableOptions.getCount() }</span>
                <span>cost: { adventurer.purchasableOptions.getCost() }</span>
                <span>increase: { adventurer.increase }</span>
                <span>income: { progress.getAdventurerIncome(adventurer) }</span>
                <button onClick={ () => { buyAdventurer(i) }}>BUY</button>
            </div>
        )
    })

    function buyAdventurer(i) {
        let adventurersClone = [...progress.get.adventurers];
        adventurersClone[i].purchasableOptions.buy();
        progress.set.adventurers(adventurersClone);
    }

    return (
        <div id='adventurers-tab'>
            { adventurerComponents }
        </div>
    )
}