import "./MapInfo.scss";
import {
    abbreviateNumber,
    basicColorTransition,
    firstLetterToUpperCase,
    formatTime,
} from "../../utils/HelperFunctions.utils";
import { LocationHookData } from "../../hooks/UseLocation";
import { ResourcesHookData } from "../../hooks/UseResources";
import ImageLoader from "../image-loader/ImageLoader";

type MapInfoComponentProps = {
    location: LocationHookData;
    resources: ResourcesHookData;
};

export default function MapInfo(props: MapInfoComponentProps) {
    const { location, resources } = props;
    const successChance = location.getChanceToSuccess();

    const rewardElements = Object.entries(location.getDrop()).map(
        ([key, el]) => {
            const icon = resources.data[key].icon;
            return (
                <li className="display-block" key={key}>
                    <ImageLoader src={icon} wrapperClass="img-imit icon" />
                    <span>{abbreviateNumber(el.amount)}</span>
                </li>
            );
        }
    );

    function successChanceStyle(chance: number): React.CSSProperties {
        return {
            color: basicColorTransition(chance),
        };
    }

    return (
        <section id="map-info">
            <h1>{firstLetterToUpperCase(location.key)}</h1>
            <p className="minor">{location.desc}</p>
            <p>
                Optimal AP: {abbreviateNumber(location.optimalAP.min)} -{" "}
                {abbreviateNumber(location.optimalAP.max)}
            </p>
            <p>Time to finish: {formatTime(location.getAdventureTime())}</p>
            <p>
                Success chance:{" "}
                <span style={successChanceStyle(successChance)}>
                    {successChance.toFixed(0)}%
                </span>
            </p>
            <ul className="reward-list">{rewardElements}</ul>
        </section>
    );
}
