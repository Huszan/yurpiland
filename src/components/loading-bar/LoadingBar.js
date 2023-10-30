import { useRef, useEffect } from 'react';
import './LoadingBar.scss';

export default function LoadingBar({progress, config}) {
    const barRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        if (config.barBg) barRef.current.style.background = config.barBg;
        if (config.barBgColor) barRef.current.style.backgroundColor = config.barBgColor;
        if (config.contentBg) contentRef.current.style.background = config.contentBg;
        if (config.contentBgColor) contentRef.current.style.backgroundColor = config.contentBgColor;
        contentRef.current.style.width = `${progress}%`;
    }, [])

    return (
        <div className='loading-bar' ref={barRef}>
            <div className='content' ref={contentRef}></div>
        </div>
    )
}