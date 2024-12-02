import { createContext, useState } from "react";
import { useWindowInfo } from "../hooks/UseWindowInfo";
import { settingsMap } from "../utils/DataSettings";

const initialMapControls = {
    zoom: 1,
    position: [0, 0],
}

export const GlobalStatesContext = createContext();

export default function GlobalStates(props) {
    const { children } = props;
    const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
    const [modalData, setModalData] = useState({
        content: null,
        isOpen: false,
    });
    const [settings, setSettings] = useState({
        map: settingsMap,
    })
    const [mapControls, setMapControls] = useState(initialMapControls);
    const windowInfo = useWindowInfo();


    return (
        <GlobalStatesContext.Provider
            value = {{
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
            { children }
        </GlobalStatesContext.Provider>
    )
}