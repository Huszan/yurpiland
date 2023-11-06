import { useRef, useEffect } from 'react';
import './LoadingBar.scss';

export default function LoadingBar({progress, config}) {
    const barRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        console.log(config.barBg);
        if (config.barBg) barRef.current.style.backgroundImage = `url(${config.barBg})`;
        if (config.barBgColor) barRef.current.style.backgroundColor = config.barBgColor;
        if (config.barContentBg) contentRef.current.style.backgroundImage = `url(${config.barContentBg})`;
        if (config.contentBgColor) contentRef.current.style.backgroundColor = config.contentBgColor;
    }, [])

    useEffect(() => {
        contentRef.current.style.width = `${progress ? progress : 0}%`;
    }, [progress])

    return (
        <div className='loading-bar' ref={barRef}>
            <div className='content' ref={contentRef}></div>
        </div>
    )
}