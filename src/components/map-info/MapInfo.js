import './MapInfo.scss';
import { basicColorTransition, firstLetterToUpperCase } from '../../utils/HelperFunctions';

export default function MapInfo({ 
    location,
}) {
    const successChance = location.getChanceToSuccess().toFixed(1);

    const rewardElements = Object.entries(location.getDrop()).map(([key, el]) => {
        return (
            <li className='display-block' key={key}>
                <img className='icon' alt='' />
                <span>{el.amount}</span>
            </li>
        )
    });

    function successChanceStyle(chance) {
        return {
            color: basicColorTransition(chance)
        }
    }

    return (
        <section id='map-info'>
            <h1>{ firstLetterToUpperCase(location.key) }</h1>
            <p className='minor'>{ location.desc }</p>
            <p>Optimal AP: { location.optimalAP.min } - { location.optimalAP.max }</p>
            <p>Time to finish: { location.getAdventureTime() / 1000 }s</p>
            <p>Success chance: <span style={successChanceStyle(successChance)}>{ successChance }%</span></p>
            <ul className='reward-list'>
                {rewardElements}
            </ul>
        </section>
    )
}