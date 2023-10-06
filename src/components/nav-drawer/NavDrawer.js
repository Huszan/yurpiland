import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavDrawer.scss';

import CloseSvg from '../../resources/icons/close.svg';
import PlaceholderImg from '../../resources/images/placeholder.jpg';

import { GlobalStatesContext } from '../../context/GlobalStates';
import { useWindowInfo } from '../../hooks/UseWindowInfo';
import { routes } from '../../utils/Routes';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';

export default function NavDrawer(props) {
    const window = useWindowInfo();
    const location = useLocation();
    const { isNavDrawerOpen, setIsNavDrawerOpen } = useContext(GlobalStatesContext);

    const navElements = routes.map(route => {
        return (
            <Link 
                to={route.path} 
                key={route.key} 
                className={`link ${location.pathname === route.path && 'active'}`} 
                onClick={close}
            >
                <img alt='' src={route.icon ? route.icon : PlaceholderImg} className='icon'></img>
                {firstLetterToUpperCase(route.key)}
            </Link>
        )
    });

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
            { !window.isDesktop && <img alt='' src={CloseSvg} onClick={close} className='icon interactable push-right' /> }
            <h1>LOGO PLACEHOLDER</h1>
            { navElements }
        </nav>
    )
}