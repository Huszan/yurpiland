import { useMemo } from "react";
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

    const barStyle: React.CSSProperties = useMemo(() => {
        return {
            backgroundImage: config.barBg ? `url(${config.barBg})` : "unset",
            backgroundColor: config.barBgColor ? config.barBgColor : "unset",
        };
    }, [config]);

    const fillStyle: React.CSSProperties = useMemo(() => {
        return {
            backgroundColor: config.fillBgColor ? config.fillBgColor : "unset",
            width: `${progress ? progress : 0}%`,
        };
    }, [config, progress]);

    return (
        <div className="loading-bar" style={barStyle}>
            <div className="fill" style={fillStyle}></div>
            <div className="progress-indicator"></div>
            {config.barBg && <div className="bg-filter"></div>}
            <span className="time-left center-abs">
                <b>{formatTime(timeLeft())}</b>
            </span>
        </div>
    );
}
