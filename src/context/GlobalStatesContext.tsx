import { createContext } from "react";
import { ModalData } from "../types/ModalData";
import { GlobalSettings, MapControls } from "./GlobalStates";
import { WindowInfo } from "../hooks/UseWindowInfo";

export type GlobalStatesContextValue = null | {
    isNavDrawerOpen: boolean;
    setIsNavDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalData: ModalData;
    setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
    settings: GlobalSettings;
    setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
    mapControls: MapControls;
    setMapControls: React.Dispatch<React.SetStateAction<MapControls>>;
    windowInfo: WindowInfo;
};

export const GlobalStatesContext =
    createContext<GlobalStatesContextValue>(null);
