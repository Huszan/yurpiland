import { abbreviateNumber } from "../../utils/HelperFunctions.utils";
import "./ApCounter.scss";
import "odometer/themes/odometer-theme-default.css";
import { useProgression } from "../../hooks/UseProgression";
import ReactOdometer from "react-odometerjs";

export default function ApCounter() {
    const { adventurers } = useProgression();
    const getAp = adventurers.getCumulatedAP;

    const [val, symbol] = abbreviateNumber(getAp());

    return (
        <>
            <div className="ap-counter">
                <span className="title">AP</span>
                <div className="display">
                    <ReactOdometer
                        value={val}
                        format="(.ddd),dd"
                        theme="default"
                    />
                    <span className="symbol">{symbol}</span>
                </div>
            </div>
        </>
    );
}
