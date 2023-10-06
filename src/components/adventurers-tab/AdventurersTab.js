import AdventurerBlock from '../adventurer-block/AdventurerBlock';
import './AdventurersTab.scss';
import { ProgressionContext } from '../../context/Progression';
import { useContext } from 'react';

export default function AdventurersTab() {
    const progress = useContext(ProgressionContext);

    const adventurerComponents = progress.get.adventurers.map((adventurer, i) => {
        return <AdventurerBlock 
            key={ adventurer.key } 
            adventurer={ adventurer } 
            index={ i } 
        />
    })

    return (
        <div id='adventurers-tab'>
            { adventurerComponents }
        </div>
    )
}