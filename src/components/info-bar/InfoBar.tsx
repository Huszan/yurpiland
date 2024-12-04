import "./InfoBar.scss";
import MenuSvg from "../../resources/icons/menu.svg";
import { useContext } from "react";
import { ProgressionContext } from "../../context/Progression";
import UndefinedIcon from "../../resources/images/placeholder.jpg";
import { abbreviateNumber } from "../../utils/HelperFunctions";
import { useGlobalStates } from "../../hooks/UseGlobalStates";

export default function InfoBar() {
    const progress = useContext(ProgressionContext);
    const { setIsNavDrawerOpen, windowInfo } = useGlobalStates();

    function toggleDrawer() {
        setIsNavDrawerOpen((prev) => !prev);
    }

    const resourceElements = Object.keys(progress.resources.data).map((key) => {
        let rsc = progress.resources.data[key];
        return (
            <li key={key} className="display-block">
                <img
                    src={rsc.icon ? rsc.icon : UndefinedIcon}
                    alt=""
                    className="icon"
                />
                {abbreviateNumber(rsc.amount)}
            </li>
        );
    });

    return (
        <div id="info-bar">
            {!windowInfo.isDesktop && (
                <img
                    alt=""
                    src={MenuSvg}
                    onClick={toggleDrawer}
                    className="icon interactable push-right"
                />
            )}
            <ul className="center">{resourceElements}</ul>
        </div>
    );
}
