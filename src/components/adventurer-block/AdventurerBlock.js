import './AdventurerBlock.scss';
import { useContext } from 'react';
import { ProgressionContext } from '../../context/Progression';
import { abbreviateNumber, firstLetterToUpperCase } from '../../utils/HelperFunctions';
import UndefinedIcon from '../../resources/images/placeholder.jpg';

export default function AdventurerBlock({adventurer}) {
    const progress = useContext(ProgressionContext);
    const resources = progress.resources;

    const canAfford = adventurer.canAfford();

    const tags = adventurer.get.tags.map(tag => {
        return (
            <li key={tag.name} className='tag' style={{backgroundColor: `${tag.color}`}}>
                { tag.name }
            </li>
        )
    })

    const cost = Object.entries(adventurer.getCost()).map(([key, cost]) => {
        const rsc = resources.data[key];
        return (
            <li key={key} className='display-block' style={{'justifyContent': 'start'}}>
                <img src={rsc.icon ? rsc.icon : UndefinedIcon} className='icon' alt='' />
                <span>{abbreviateNumber(cost.amount)}</span>
            </li>
        )
    })

    return (
        <div className='adventurer-block' key={ adventurer.get.key }>
            <h3>{firstLetterToUpperCase(adventurer.get.key)}</h3>
            <ul className='tags-wrapper'>
                { tags }
            </ul>
            <span>Level { abbreviateNumber(adventurer.get.level) }</span>
            <span>AP: { abbreviateNumber(adventurer.getModifiedAP()) } (+{ adventurer.get.AP })</span>
            <ul>
                { cost }
            </ul>
            <button className='basic' onClick={ () => adventurer.buy() } disabled={ !canAfford }>BUY</button>
        </div>
    )
}