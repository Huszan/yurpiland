import './AdventurerBlock.scss';
import IntervalBar from '../interval-bar/IntervalBar';
import { useContext } from 'react';
import { ProgressionContext } from '../../context/Progression';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';

export default function AdventurerBlock(props) {
    const { adventurer } = props;
    const progress = useContext(ProgressionContext);

    const canAfford = adventurer.getCost() <= progress.get.yurpis;
    const incPerSec = adventurer.getAdventureIncome() / adventurer.duration;

    return (
        <div className='adventurer-block' key={ adventurer.key }>
            <h3>{firstLetterToUpperCase(adventurer.key)}</h3>
            <span>Level { adventurer.level }</span>
            <span>Cost: { adventurer.getCost() }</span>
            <span>Income: { adventurer.getAdventureIncome() } ({ incPerSec }/s)</span>
            <button onClick={ () => adventurer.buy() } disabled={ !canAfford }>BUY</button>
            {
                0 < adventurer.level && !adventurer.hasSendAuto &&
                <button onClick={ () => { adventurer.sendOnAdventure() }}>SEND ON ADVENTURE</button>
            }
            <IntervalBar 
                timer={ adventurer.currentAdventureStartTime } 
                duration={ adventurer.getAdventureDurationWithModifiers() }
            />
        </div>
    )
}