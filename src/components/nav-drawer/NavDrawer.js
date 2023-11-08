import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavDrawer.scss';

import CloseSvg from '../../resources/icons/close.svg';
import PlaceholderImg from '../../resources/images/placeholder.jpg';
import LogoImg from '../../resources/images/logo/logo.png';

import { GlobalStatesContext } from '../../context/GlobalStates';
import { useWindowInfo } from '../../hooks/UseWindowInfo';
import { routes } from '../../utils/Routes';
import { firstLetterToUpperCase } from '../../utils/HelperFunctions';
import ApCounter from '../ap-counter/ApCounter';

export default function NavDrawer(props) {
    const window = useWindowInfo();
    const location = useLocation();
    const { isNavDrawerOpen, setIsNavDrawerOpen } = useContext(GlobalStatesContext);

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

    const navElements = routes.map(route => {
        return (
            <li key={route.key} >
                <Link 
                    to={route.path} 
                    className={`link ${location.pathname === route.path && 'active'}`} 
                    onClick={close}
                >
                    <img alt='' src={route.icon ? route.icon : PlaceholderImg} className='icon'></img>
                    {firstLetterToUpperCase(route.key)}
                </Link>
            </li>
        )
    });

    return (
        <nav id='nav-drawer'>
            { !window.isDesktop && 
                <button className='close-button' onClick={close}>
                    <img alt='' src={CloseSvg} className='icon' /> 
                </button>
            }
            <img className='logo' src={LogoImg} alt='' />
            <ApCounter />
            <ul className='nav-list'>
                { navElements }
            </ul>
        </nav>
    )
}