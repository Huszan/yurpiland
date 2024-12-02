import "./MainContent.scss";
import { Outlet } from "react-router-dom";
import InfoBar from "../info-bar/InfoBar";
import { useContext } from "react";
import { ProgressionContext } from "../../context/Progression";
import { GlobalStatesContext } from "../../context/GlobalStates";
import MapInfo from "../map-info/MapInfo";
import MapProgress from "../map-progress/MapProgress";

export default function MainContent() {
    const { setModalData } = useContext(GlobalStatesContext);
    const { locations, resources, adventure } = useContext(ProgressionContext);

    function openAdventureInfo() {
        setModalData((prev) => {
            return {
                ...prev,
                content: (
                    <MapInfo
                        location={locations.get.selected}
                        resources={resources}
                    />
                ),
                isOpen: true,
            };
        });
    }

    return (
        <main>
            <InfoBar />
            <MapProgress
                openInfo={() => openAdventureInfo()}
                adventure={adventure}
                location={locations.get.selected}
            />
            <Outlet />
        </main>
    );
}
