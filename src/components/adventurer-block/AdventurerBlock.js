import './AdventurerBlock.scss';
import IntervalBar from '../interval-bar/IntervalBar';
import { useContext } from 'react';
import { ProgressionContext } from '../../context/Progression';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';

export default function AdventurerBlock(props) {
    const { adventurer, index } = props;
    const progress = useContext(ProgressionContext);

    const canAfford = adventurer.purchasableOptions.getCost() <= progress.get.yurpis;
    const incPerSec = progress.adventurers.getAdventureIncome(adventurer) / adventurer.duration;

    return (
        <div className='adventurer-block' key={ adventurer.key }>
            <h3>{firstLetterToUpperCase(adventurer.key)}</h3>
            <span>Level { adventurer.purchasableOptions.getCount() }</span>
            <span>Cost: { adventurer.purchasableOptions.getCost() }</span>
            <span>Income: { progress.adventurers.getAdventureIncome(adventurer) } ({ incPerSec }/s)</span>
            <button onClick={ () => { progress.adventurers.buyAdventurer(index) }} disabled={ !canAfford }>BUY</button>
            {
                0 < adventurer.purchasableOptions.getCount() && !adventurer.hasSendAuto &&
                <button onClick={ () => { progress.adventurers.sendOnAdventure(adventurer, index) }}>SEND ON ADVENTURE</button>
            }
            <IntervalBar 
                timer={ adventurer.currentAdventureStartTime } 
                duration={ progress.adventurers.getAdventureDurationWithModifiers(adventurer) }
            />
        </div>
    )
}