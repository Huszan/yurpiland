import LoadingBar from '../loading-bar/LoadingBar';
import './MapProgress.scss';
import InfoSvg from '../../resources/icons/info.svg';
import StartSvg from '../../resources/icons/sprint.svg';
import StopSvg from '../../resources/icons/front_hand.svg';

export default function MapProgress({openInfo, adventure, location}) {

    let loadingBarConfig = {
        barBgColor: location.bg ? null : '#ffffff',
        contentBgColor: location.bgSelected ? null : '#000000',
        barBg: location.bg ? location.bg : null,
        barContentBg: location.bgSelected ? location.bgSelected : null,
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

    // Not adventuring at this location
    if (adventure.currentLocationKey !== location.key) {
        return (
            <section id='map-progress'>
                <LoadingBar progress={0} config={loadingBarConfig} />
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
            <LoadingBar progress={adventure.progress} config={loadingBarConfig} />
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