import "./AdventurerBlock.scss";
import { firstLetterToUpperCase } from "../../utils/HelperFunctions.utils";
import { useProgression } from "../../hooks/UseProgression";
import { AdventurerHookData } from "../../hooks/UseAdventurer";
import ImageLoader from "../image-loader/ImageLoader";
import { formatBigNumber } from "../../utils/Math.utils";

type AdventurerBlockComponentProps = {
    adventurer: AdventurerHookData;
};

export default function AdventurerBlock(props: AdventurerBlockComponentProps) {
    const { adventurer } = props;
    const progress = useProgression();
    const resources = progress.resources;

    const tagElements = adventurer.tags.map((tag) => {
        return (
            <li
                key={tag.name}
                className="tag"
                style={{ backgroundColor: `${tag.color}` }}
            >
                {tag.name}
            </li>
        );
    });

    const costElements = Object.entries(adventurer.cost).map(([key, cost]) => {
        const rsc = resources.data[key];
        return (
            <li
                key={key}
                className="display-block"
                style={{ justifyContent: "start" }}
            >
                <ImageLoader src={rsc.icon} wrapperClass="img-imit icon" />
                <span>{formatBigNumber(cost!.amount)}</span>
            </li>
        );
    });

    return (
        <div className="adventurer-block" key={adventurer.key}>
            <div className="wrap-flex-row">
                <div
                    className={`adventurer-icon ${
                        adventurer.level === 0 ? "not-bought" : ""
                    }`}
                >
                    <ImageLoader src={adventurer.icon}></ImageLoader>
                </div>
                <div className="wrap-flex-col adventurer-info">
                    <h3>
                        {firstLetterToUpperCase(adventurer.key)} lvl{" "}
                        {adventurer.level}
                    </h3>
                    <ul className="tags-wrapper">{tagElements}</ul>
                    <div>
                        AP: {formatBigNumber(adventurer.modifiedAP)} (+
                        {formatBigNumber(adventurer.AP)})
                    </div>
                    <ul>{costElements}</ul>
                </div>
            </div>
            <button
                className="basic"
                onClick={() => adventurer.buy()}
                disabled={!adventurer.canAfford}
            >
                BUY
            </button>
        </div>
    );
}
