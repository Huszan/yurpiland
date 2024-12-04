import { useState } from "react";
import { useWindowInfo } from "../hooks/UseWindowInfo";
import { mapConfig } from "../utils/DataSettings";
import { MapConfig } from "../types/MapConfig";
import { ModalData } from "../types/ModalData";
import { GlobalStatesContext } from "./GlobalStatesContext";

export type MapControls = {
    zoom: number;
    position: [number, number];
};

const initialMapControls: MapControls = {
    zoom: 1,
    position: [0, 0],
};

export type GlobalSettings = {
    mapConfig: MapConfig;
};

export default function GlobalStates(props: React.PropsWithChildren) {
    const { children } = props;
    const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ModalData>({
        content: null,
        isOpen: false,
    });
    const [settings, setSettings] = useState<GlobalSettings>({
        mapConfig: mapConfig,
    });
    const [mapControls, setMapControls] =
        useState<MapControls>(initialMapControls);
    const windowInfo = useWindowInfo();

    return (
        <GlobalStatesContext.Provider
            value={{
                isNavDrawerOpen,
                setIsNavDrawerOpen,
                modalData,
                setModalData,
                settings,
                setSettings,
                mapControls,
                setMapControls,
                windowInfo,
            }}
        >
            {children}
        </GlobalStatesContext.Provider>
    );
}
