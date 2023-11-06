import LoadingBar from '../loading-bar/LoadingBar';
import './MapProgress.scss';
import InfoSvg from '../../resources/icons/info.svg';
import StartSvg from '../../resources/icons/sprint.svg';
import StopSvg from '../../resources/icons/front_hand.svg';

export default function MapProgress({openInfo, adventure}) {

    let loadingBarConfig = {
        barBgColor: '#ffffff',
        contentBgColor: '#000000'
    }
    if (adventure.bg && adventure.bgSelected) {
        loadingBarConfig = {
            barBg: adventure.bg,
            barContentBg: adventure.bgSelected,
        }
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
                <button className='secondary' onClick={onStartClick}>
                    <img src={StartSvg} className='icon-l' alt='' />
                </button> :
                <button className='secondary' onClick={onStopClick}>
                    <img src={StopSvg} className='icon-l' alt='' />
                </button>
            }
            <button className='basic' onClick={onInfoClick}>
                <img src={InfoSvg} className='icon-l' alt='' />
            </button>
        </section>
    )
}