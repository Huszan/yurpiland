import './InfoBar.scss';
import MenuSvg from '../../resources/icons/menu.svg';
import { useContext } from 'react';
import { GlobalStatesContext } from '../../context/GlobalStates';
import { ProgressionContext } from '../../context/Progression';
import { useWindowInfo } from '../../hooks/UseWindowInfo';
import UndefinedIcon from '../../resources/images/placeholder.jpg';
import YurpiPng from '../../resources/images/yurpi.png';

export default function InfoBar(props) {
    const window = useWindowInfo();
    const progress = useContext(ProgressionContext);
    const {setIsNavDrawerOpen} = useContext(GlobalStatesContext);

    function toggleDrawer() {
        setIsNavDrawerOpen(prev => !prev);
    }

    const resourceElements = progress.resources.get.map(rsc => {
        return (
            <li key={rsc.key} className='display-block'>
                <img src={rsc.icon ? rsc.icon : UndefinedIcon} alt='' className='icon' />
                { rsc.amount }
            </li>
        )
    })

    return (
        <div id='info-bar'>
            { !window.isDesktop && <img alt='' src={MenuSvg} onClick={toggleDrawer} className='icon interactable push-right' /> }
            <ul className='center'>
                { resourceElements }
            </ul>
        </div>
    )
}