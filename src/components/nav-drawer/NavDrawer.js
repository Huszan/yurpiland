import { useContext, useEffect } from 'react';
import { WindowContext } from '../../utils/WindowManager';
import './NavDrawer.scss';
import CloseSvg from '../../resources/icons/close.svg';
import { GlobalStatesContext } from '../../utils/GlobalStates';

export default function NavDrawer(props) {
    const window = useContext(WindowContext);
    const { isNavDrawerOpen, setIsNavDrawerOpen } = useContext(GlobalStatesContext);
    const { children } = props;

    useEffect(() => {
        const nav = document.getElementById('nav-drawer');
        if (isNavDrawerOpen || window.isDesktop) {
            nav.style.transform = "translateX(0)";
        }
        else {
            nav.style.transform = "translateX(-120vw)";
        }
    }, [isNavDrawerOpen, window.isDesktop])

    function close() {
        setIsNavDrawerOpen(false);
    }

    return (
        <nav id='nav-drawer'>
            { !window.isDesktop && <img alt='' src={CloseSvg} onClick={close} className='icon interactable' /> }
            <h1>LOGO PLACEHOLDER</h1>
            { children }
        </nav>
    )
}