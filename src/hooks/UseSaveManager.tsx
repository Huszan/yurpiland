import { useContext } from "react";
import {
    SaveManagerContext,
    SaveManagerContextValue,
} from "../context/SaveManager.context";

export function useSaveManager() {
    const context = useContext<SaveManagerContextValue>(SaveManagerContext);

    if (!context) {
        throw new Error(
            "SaveManagerContext must be used within a GlobalStates.Provider"
        );
    }

    return context;
}
