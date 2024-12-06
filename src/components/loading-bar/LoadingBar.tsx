import { useRef, useEffect } from "react";
import { formatTime } from "../../utils/HelperFunctions.utils";
import "./LoadingBar.scss";

export default function LoadingBar({ progress, timeLeft, config }) {
    const barRef = useRef();
    const fillRef = useRef();

    useEffect(() => {
        barRef.current.style.backgroundImage = config.barBg
            ? `url(${config.barBg})`
            : "unset";
        barRef.current.style.backgroundColor = config.barBgColor
            ? config.barBgColor
            : "unset";
        fillRef.current.style.backgroundColor = config.fillBgColor
            ? config.fillBgColor
            : "unset";
    }, [config]);

    useEffect(() => {
        fillRef.current.style.width = `${progress ? progress : 0}%`;
    }, [progress]);

    return (
        <div className="loading-bar" ref={barRef}>
            <div className="fill" ref={fillRef}></div>
            <div className="progress-indicator"></div>
            {config.barBg && <div className="bg-filter"></div>}
            <span className="time-left center-abs">
                <b>{formatTime(timeLeft())}</b>
            </span>
        </div>
    );
}
