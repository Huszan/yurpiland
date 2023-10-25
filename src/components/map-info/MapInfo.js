import './MapInfo.scss';
import CloseSvg from '../../resources/icons/close.svg';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';

export default function MapInfo({ 
    location, 
    isOpen, 
    setIsOpen,
}) {
    if (!isOpen) return;

    function onClose() {
        setIsOpen(false);
    }

    const rewardElements = location.getDrop().map(el => {
        return (
            <li className='display-block' key={el.key}>
                <img className='icon' alt='' />
                <span>{el.amount}</span>
            </li>
        )
    });

    return (
        <section id='map-info'>
            <button className='close-button' onClick={onClose}>
                <img src={CloseSvg} className='icon' alt='' />
            </button>
            <h1>{ firstLetterToUpperCase(location.key) }</h1>
            <p className='minor'>{ location.desc }</p>
            <p>Optimal AP: { location.optimalAP.min } - { location.optimalAP.max }</p>
            <p>Time to finish: ~{ location.getAdventureTime() / 1000 }s</p>
            <p>Success chance: ~{ location.getChanceToSuccess().toFixed(1) }%</p>
            <ul className='reward-list'>
                {rewardElements}
            </ul>
        </section>
    )
}