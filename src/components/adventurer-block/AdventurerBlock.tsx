import "./AdventurerBlock.scss";
import { useContext } from "react";
import { ProgressionContext } from "../../context/Progression";
import {
    abbreviateNumber,
    firstLetterToUpperCase,
} from "../../utils/HelperFunctions";
import UndefinedIcon from "../../resources/images/placeholder.jpg";

export default function AdventurerBlock({ adventurer }) {
    const progress = useContext(ProgressionContext);
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
                <img
                    src={rsc.icon ? rsc.icon : UndefinedIcon}
                    className="icon"
                    alt=""
                />
                <span>{abbreviateNumber(cost.amount)}</span>
            </li>
        );
    });

    return (
        <div className="adventurer-block" key={adventurer.key}>
            <div className="wrap-flex-row">
                <img
                    className={`adventurer-icon ${
                        adventurer.level === 0 ? "not-bought" : ""
                    }`}
                    src={adventurer.icon ? adventurer.icon : UndefinedIcon}
                    alt=""
                ></img>
                <div className="wrap-flex-col adventurer-info">
                    <h3>
                        {firstLetterToUpperCase(adventurer.key)} lvl{" "}
                        {adventurer.level}
                    </h3>
                    <ul className="tags-wrapper">{tagElements}</ul>
                    <div>
                        AP: {abbreviateNumber(adventurer.modifiedAP)} (+
                        {abbreviateNumber(adventurer.AP)})
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
