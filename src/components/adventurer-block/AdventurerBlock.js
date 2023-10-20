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

    const tags = adventurer.tags.map(tag => {
        return (
            <li key={tag.name} className='tag' style={{backgroundColor: `${tag.color}`}}>
                { tag.name }
            </li>
        )
    })

    return (
        <div className='adventurer-block' key={ adventurer.key }>
            <h3>{firstLetterToUpperCase(adventurer.key)}</h3>
            <ul className='tags-wrapper'>
                { tags }
            </ul>
            <span>Level { adventurer.level }</span>
            <span>Cost: { adventurer.getCost() }</span>
            <span>Income: { adventurer.getAdventureIncome() } ({ incPerSec }/s)</span>
            <button className='basic' onClick={ () => adventurer.buy() } disabled={ !canAfford }>BUY</button>
            {
                0 < adventurer.level && !adventurer.hasSendAuto &&
                <button className='secondary' onClick={ () => { adventurer.sendOnAdventure() }}>SEND ON ADVENTURE</button>
            }
            <IntervalBar 
                timer={ adventurer.currentAdventureStartTime } 
                duration={ adventurer.getAdventureDurationWithModifiers() }
            />
        </div>
    )
}