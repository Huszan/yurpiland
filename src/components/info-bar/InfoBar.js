import './InfoBar.scss';
import MenuSvg from '../../resources/icons/menu.svg';
import { useContext } from 'react';
import { WindowContext } from '../../utils/WindowManager';
import { GlobalStatesContext } from '../../utils/GlobalStates';

export default function InfoBar(props) {
    const window = useContext(WindowContext);
    const {setIsNavDrawerOpen} = useContext(GlobalStatesContext);

    function toggleDrawer() {
        setIsNavDrawerOpen(prev => !prev);
    }

    return (
        <div id='info-bar'>
            { !window.isDesktop && <img alt='' src={MenuSvg} onClick={toggleDrawer} className='icon interactable' /> }
        </div>
    )
}