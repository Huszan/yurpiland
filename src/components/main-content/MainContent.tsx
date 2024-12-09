import "./MainContent.scss";
import { Outlet } from "react-router-dom";
import InfoBar from "../info-bar/InfoBar";
import MapInfo from "../map-info/MapInfo";
import MapProgress from "../map-progress/MapProgress";
import { useGlobalStates } from "../../hooks/UseGlobalStates";
import { useProgression } from "../../hooks/UseProgression";

export default function MainContent() {
    const { setModalData } = useGlobalStates();
    const { locations, resources, adventure } = useProgression();

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
