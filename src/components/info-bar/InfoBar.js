import './InfoBar.scss';
import MenuSvg from '../../resources/icons/menu.svg';
import { useContext } from 'react';
import { GlobalStatesContext } from '../../context/GlobalStates';
import { ProgressionContext } from '../../context/Progression';
import { useWindowInfo } from '../../hooks/UseWindowInfo';

export default function InfoBar(props) {
    const window = useWindowInfo();
    const progress = useContext(ProgressionContext);
    const {setIsNavDrawerOpen} = useContext(GlobalStatesContext);

    function toggleDrawer() {
        setIsNavDrawerOpen(prev => !prev);
    }

    return (
        <div id='info-bar'>
            { !window.isDesktop && <img alt='' src={MenuSvg} onClick={toggleDrawer} className='icon interactable push-right' /> }
            <span className='display-block'>
                <img alt='' className='icon' />
                { progress.get.yurpis}
            </span>
        </div>
    )
}