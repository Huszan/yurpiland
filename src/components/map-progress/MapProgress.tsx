import LoadingBar, {
    LoadingBarComponentConfig,
} from "../loading-bar/LoadingBar";
import "./MapProgress.scss";
import InfoSvg from "../../resources/icons/info.svg";
import StartSvg from "../../resources/icons/sprint.svg";
import StopSvg from "../../resources/icons/front_hand.svg";
import { LocationHookData } from "../../hooks/UseLocation";
import { AdventureHookData } from "../../hooks/UseAdventure";

type MapProgressComponentProps = {
    openInfo: () => void;
    adventure: AdventureHookData;
    location: LocationHookData;
};

export default function MapProgress(props: MapProgressComponentProps) {
    const { openInfo, adventure, location } = props;

    const loadingBarConfig: LoadingBarComponentConfig = {
        barBgColor: location.bg ? null : "#545454",
        fillBgColor: location.bg ? null : "#32a852",
        barBg: location.bg,
    };

    function onStartClick() {
        adventure.start();
    }

    function onStopClick() {
        adventure.stop();
    }

    function onInfoClick() {
        openInfo();
    }

    function getTimeLeft() {
        const max = location.getAdventureTime();
        const curr = max - max * (adventure.progress / 100);
        return curr;
    }

    // Not adventuring at this location
    if (adventure.currentLocationKey !== location.key) {
        return (
            <section id="map-progress">
                <LoadingBar
                    progress={0}
                    timeLeft={location.getAdventureTime}
                    config={loadingBarConfig}
                />
                <button className="secondary" onClick={onStartClick}>
                    <img src={StartSvg} className="icon-l" alt="" />
                </button>
                <button className="basic" onClick={onInfoClick}>
                    <img src={InfoSvg} className="icon-l" alt="" />
                </button>
            </section>
        );
    }
    // Adventuring at this location
    return (
        <section id="map-progress">
            <LoadingBar
                progress={adventure.progress}
                timeLeft={getTimeLeft}
                config={loadingBarConfig}
            />
            {!adventure.isInProgress ? (
                <button className="secondary" onClick={onStartClick}>
                    <img src={StartSvg} className="icon-l" alt="" />
                </button>
            ) : (
                <button
                    className="secondary"
                    onClick={onStopClick}
                    disabled={location.hasAutoSendOn}
                >
                    <img src={StopSvg} className="icon-l" alt="" />
                </button>
            )}
            <button className="basic" onClick={onInfoClick}>
                <img src={InfoSvg} className="icon-l" alt="" />
            </button>
        </section>
    );
}
