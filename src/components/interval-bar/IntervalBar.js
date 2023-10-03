import { useEffect, useRef, useState } from 'react';
import './IntervalBar.scss';

export default function IntervalBar(props) {
    const { isLoading, onLoad, time = 2000 } = props;
    const [timer, setTimer] = useState(new Date());
    const progressBar = useRef();
    
    function getProgress() {
        const progress = Math.min(((new Date().getTime() - timer.getTime()) / time) * 100, 100);
        return timer ? progress : 0;
    }

    function updateProgressBar() {
        if (!progressBar.current) return;
        const progress = getProgress();
        progressBar.current.style.width = `${progress}%`;
        if (progress >= 100) return;
        setTimeout(() => {
            window.requestAnimationFrame(updateProgressBar);
        }, 10)
    }

    useEffect(() => {
        if (!isLoading) return;
        const timeInterval = setInterval(() => {
            setTimer(new Date());
            onLoad();
        }, time)
        if (time >= 200) window.requestAnimationFrame(updateProgressBar);
        else progressBar.current.style.width = '100%';

        return () => {
            clearInterval(timeInterval);
        }
    }, [timer, isLoading]);

    return (
        <div className='interval-bar'>
            <div className='progress-bar' ref={progressBar}></div>
        </div>
    )
}