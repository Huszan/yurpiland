import { useRef, useEffect } from 'react';
import { formatTime } from '../../utils/HelperFunctions';
import './LoadingBar.scss';

export default function LoadingBar({progress, timeLeft, config}) {
    const barRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        barRef.current.style.backgroundImage = config.barBg ? `url(${config.barBg})` : 'unset';
        contentRef.current.style.backgroundImage = config.barContentBg ? `url(${config.barContentBg})` : 'unset';
        barRef.current.style.backgroundColor = config.barBgColor ? config.barBgColor : 'unset'; 
        contentRef.current.style.backgroundColor = config.contentBgColor ? config.contentBgColor : 'unset';
    }, [config])

    useEffect(() => {
        contentRef.current.style.width = `${progress ? progress : 0}%`;
    }, [progress])

    return (
        <div className='loading-bar' ref={barRef}>
            <div className='content' ref={contentRef}></div>
            <div className='progress-indicator'></div>
            <span className='time-left center-abs'><b>{formatTime(timeLeft())}</b></span>
        </div>
    )
}