import { useContext } from "react";
import {
    ProgressionContext,
    ProgressionContextValue,
} from "../context/Progression.context";

export function useProgression() {
    const context = useContext<ProgressionContextValue>(ProgressionContext);

    if (!context) {
        throw new Error(
            "ProgressionContext must be used within a GlobalStates.Provider"
        );
    }

    return context;
}
