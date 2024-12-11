import { useEffect } from "react";
import { SaveManagerContextValue } from "../context/SaveManager.context";

let isLoaded = false;

export function useAppLoader(saveManager: SaveManagerContextValue) {
    if (!saveManager) throw new Error("Save manager not found");

    useEffect(() => {
        if (isLoaded === false) {
            saveManager.loadGame();
            isLoaded = true;
        }
    }, []);

    return {
        isLoaded,
    };
}
