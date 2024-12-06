import { useContext } from "react";
import Odometer from "react-odometerjs";
import { ProgressionContext } from "../../context/Progression";
import { abbreviateNumber } from "../../utils/HelperFunctions.utils";
import "./ApCounter.scss";
import "odometer/themes/odometer-theme-default.css";

export default function ApCounter() {
    const { adventurers } = useContext(ProgressionContext);
    const getAp = adventurers.getCumulatedAP;

    const [val, symbol] = abbreviateNumber(getAp());

    return (
        <>
            <div className="ap-counter">
                <span className="title">AP</span>
                <div className="display">
                    <Odometer value={val} format="(.ddd),dd" theme="default" />
                    <span className="symbol">{symbol}</span>
                </div>
            </div>
        </>
    );
}
