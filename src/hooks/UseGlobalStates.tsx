import { useContext } from "react";
import {
    GlobalStatesContext,
    GlobalStatesContextValue,
} from "../context/GlobalStatesContext";

export function useGlobalStates() {
    const context = useContext<GlobalStatesContextValue>(GlobalStatesContext);

    if (!context) {
        throw new Error(
            "GlobalStatesContext must be used within a GlobalStates.Provider"
        );
    }

    return context;
}
