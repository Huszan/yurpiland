import LoadingBar from '../loading-bar/LoadingBar';
import './MapProgress.scss';
import InfoSvg from '../../resources/icons/info.svg';
import StartSvg from '../../resources/icons/sprint.svg';
import StopSvg from '../../resources/icons/front_hand.svg';

export default function MapProgress({openInfo, adventure, location}) {

    let loadingBarConfig = {
        barBgColor: location.bg ? null : '#545454',
        fillBgColor: location.bg ? null : '#32a852',
        barBg: location.bg,
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

    function getTimeLeft() {
        let max = location.getAdventureTime();
        let curr = max - (max * (adventure.progress / 100));
        return curr;
    }

    // Not adventuring at this location
    if (adventure.currentLocationKey !== location.key) {
        return (
            <section id='map-progress'>
                <LoadingBar progress={0} timeLeft={location.getAdventureTime} config={loadingBarConfig} />
                <button className='secondary' onClick={onStartClick}>
                        <img src={StartSvg} className='icon-l' alt='' />
                </button>
                <button className='basic' onClick={onInfoClick}>
                    <img src={InfoSvg} className='icon-l' alt='' />
                </button>
            </section>
        )
    }
    // Adventuring at this location
    return (
        <section id='map-progress'>
            <LoadingBar progress={adventure.progress} timeLeft={getTimeLeft} config={loadingBarConfig} />
            {
                !adventure.isInProgress ?
                <button className='secondary' onClick={onStartClick}>
                    <img src={StartSvg} className='icon-l' alt='' />
                </button> :
                <button className='secondary' onClick={onStopClick}>
                    <img src={StopSvg} className='icon-l' alt='' disabled={location.hasAutoSendOn} />
                </button>
            }
            <button className='basic' onClick={onInfoClick}>
                <img src={InfoSvg} className='icon-l' alt='' />
            </button>
        </section>
    )
}