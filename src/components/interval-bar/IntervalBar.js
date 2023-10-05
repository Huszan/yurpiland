import { useEffect, useRef, useState } from 'react';
import './IntervalBar.scss';

export default function IntervalBar(props) {
    const { timer, duration = 2000 } = props;
    const progressBar = useRef();
    
    function getProgress() {
        if (!timer) return 0;
        const progress = ((new Date().getTime() - timer.getTime()) / duration) * 100;
        return progress;
    }

    function updateProgressBar() {
        if (!progressBar.current) return;
        const progress = getProgress();
        progressBar.current.style.width = `${progress.toFixed(1)}%`;
        if (progress > 100) {
            progressBar.current.style.width = `0%`;
            return;
        };
        setTimeout(() => {
            window.requestAnimationFrame(updateProgressBar);
        }, 10)
    }

    useEffect(() => {
        if (!timer) return;
        if (duration >= 200) window.requestAnimationFrame(updateProgressBar);
        else progressBar.current.style.width = '100%';
    }, [timer]);

    return (
        <div className='interval-bar'>
            <div className='progress-bar' ref={progressBar}></div>
        </div>
    )
}