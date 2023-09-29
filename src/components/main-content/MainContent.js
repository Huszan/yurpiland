import './MainContent.scss';
import { Outlet } from 'react-router-dom';
import InfoBar from '../info-bar/InfoBar';

export default function MainContent(props) {
    return (
        <main>
            <InfoBar />
            <Outlet />
        </main>
    )
}