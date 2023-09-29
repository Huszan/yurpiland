import './MainContent.scss';
import { Outlet } from 'react-router-dom';
import InfoBar from '../info-bar/InfoBar';

export default function MainContent(props) {
    const { setIsDrawerOpen } = props;

    return (
        <main>
            <InfoBar setIsDrawerOpen={setIsDrawerOpen} />
            <Outlet />
        </main>
    )
}