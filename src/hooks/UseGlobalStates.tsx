import { useContext } from "react";
import { GlobalStatesContext } from "../context/GlobalStatesContext";

export function useGlobalStates() {
    const context = useContext(GlobalStatesContext);

    if (!context) {
        throw new Error(
            "GlobalStatesContext must be used within a GlobalStates.Provider"
        );
    }

    return context;
}
