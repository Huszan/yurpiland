import AdventurerBlock from '../adventurer-block/AdventurerBlock';
import './AdventurersTab.scss';
import { ProgressionContext } from '../../context/Progression';
import { useContext } from 'react';

export default function AdventurersTab() {
    const progress = useContext(ProgressionContext);
    const adventurers = progress.adventurers;

    const adventurerComponents = adventurers.data.map((adventurer) => {
        return (
            <AdventurerBlock 
                key={ adventurer.key } 
                adventurer={ adventurer } 
            />
        )
    });

    return (
        <div id='adventurers-tab'>
            { adventurerComponents }
        </div>
    )
}