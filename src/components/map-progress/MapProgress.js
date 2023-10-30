import LoadingBar from '../loading-bar/LoadingBar';
import './MapProgress.scss';
import InfoSvg from '../../resources/icons/info.svg';

export default function MapProgress({openInfo}) {

    const loadingBarConfig = {
        barBgColor: 'black',
        contentBgColor: 'green',
    }

    function onStartClick() {
        // TODO: adventureStart function
        console.log('Start');
    }

    function onInfoClick() {
        openInfo();
    }

    return (
        <section id='map-progress'>
            <LoadingBar progress={60} config={loadingBarConfig} />
            <button className='secondary' onClick={onStartClick}>Start</button>
            <button className='basic' onClick={onInfoClick}>
                <img src={InfoSvg} className='icon-l' alt='' />
            </button>
        </section>
    )
}