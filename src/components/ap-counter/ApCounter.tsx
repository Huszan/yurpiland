import "./ApCounter.scss";
import "odometer/themes/odometer-theme-default.css";
import { useProgression } from "../../hooks/UseProgression";
import ReactOdometer from "react-odometerjs";
import { formatBigNumberSeparately } from "../../utils/Math.utils";
import { useMemo } from "react";

export default function ApCounter() {
    const { adventurers } = useProgression();
    const ap = useMemo(() => {
        return adventurers.getCumulatedAP();
    }, [adventurers.data]);
    const { scaled, suffix } = formatBigNumberSeparately(ap);

    return (
        <>
            <div className="ap-counter">
                <span className="title">AP</span>
                <div className="display">
                    <ReactOdometer
                        value={scaled.toNumber()}
                        format="(.ddd),dd"
                        theme="default"
                    />
                    <span className="symbol">{suffix}</span>
                </div>
            </div>
        </>
    );
}
