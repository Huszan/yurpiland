import LoadingBar from '../loading-bar/LoadingBar';
import './MapProgress.scss';
import InfoSvg from '../../resources/icons/info.svg';

export default function MapProgress({openInfo, location, adventure}) {

    const loadingBarConfig = {
        barBgColor: 'black',
        contentBgColor: 'green',
    }

    function onStartClick() {
        adventure.start();
    }

    function onStopClick() {
        adventure.stop();
    }

    function onInfoClick() {
        openInfo();
    }

    return (
        <section id='map-progress'>
            <LoadingBar progress={adventure.progress} config={loadingBarConfig} />
            {
                !adventure.isInProgress ?
                <button className='secondary' onClick={onStartClick}>Start</button> :
                <button className='secondary' onClick={onStopClick}>Stop</button>
            }
            <button className='basic' onClick={onInfoClick}>
                <img src={InfoSvg} className='icon-l' alt='' />
            </button>
        </section>
    )
}