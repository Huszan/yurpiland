import './AdventurerBlock.scss';
import IntervalBar from '../interval-bar/IntervalBar';
import { useContext } from 'react';
import { ProgressionContext } from '../../context/Progression';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';

export default function AdventurerBlock(props) {
    const { adventurer, index } = props;
    const progress = useContext(ProgressionContext);

    const canAfford = adventurer.purchasableOptions.getCost() <= progress.get.yurpis;
    const incPerSec = progress.getAdventureIncome(adventurer) / adventurer.duration;

    function buyAdventurer(i) {
        const adventurers = progress.get.adventurers;
        if (!adventurers[i] || progress.get.yurpis < adventurers[i].purchasableOptions.getCost()) {
            console.warn('Not enough yurpis');
            return;
        }
        else {
            let cost = adventurers[i].purchasableOptions.getCost();
            progress.set.yurpis(prev => prev - cost);
            let adventurersClone = [...adventurers];
            adventurersClone[i].purchasableOptions.buy();
            progress.set.adventurers(adventurersClone);
        }
    }

    return (
        <div className='adventurer-block' key={ adventurer.key }>
            <h3>{firstLetterToUpperCase(adventurer.key)}</h3>
            <span>Level { adventurer.purchasableOptions.getCount() }</span>
            <span>Cost: { adventurer.purchasableOptions.getCost() }</span>
            <span>Income: { progress.getAdventureIncome(adventurer) } ({ incPerSec }/s)</span>
            <button onClick={ () => { buyAdventurer(index) }} disabled={ !canAfford }>BUY</button>
            {
                0 < adventurer.purchasableOptions.getCount() && !adventurer.hasSendAuto &&
                <button onClick={ () => { progress.sendOnAdventure(adventurer, index) }}>SEND ON ADVENTURE</button>
            }
            <IntervalBar 
                timer={ adventurer.currentAdventureStartTime } 
                duration={ progress.getAdventureDurationWithModifiers(adventurer) }
            />
        </div>
    )
}