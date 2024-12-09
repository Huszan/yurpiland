import { useRef, useEffect } from "react";
import { formatTime } from "../../utils/HelperFunctions.utils";
import "./LoadingBar.scss";

type LoadingBarComponentProps = {
    progress: number;
    timeLeft: () => number;
    config: LoadingBarComponentConfig;
};

export type LoadingBarComponentConfig = {
    barBg: string | null;
    barBgColor: string | null;
    fillBgColor: string | null;
};

export default function LoadingBar(props: LoadingBarComponentProps) {
    const { progress, timeLeft, config } = props;
    const barRef = useRef<HTMLDivElement | null>(null);
    const fillRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!barRef.current || !fillRef.current) return;
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
        if (!fillRef.current) return;
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
