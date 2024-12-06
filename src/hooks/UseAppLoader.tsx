import { useEffect, useState } from "react";
import { SaveManagerContextValue } from "../context/SaveManager.context";

export function useAppLoader(saveManager: SaveManagerContextValue) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        saveManager!.loadGame();
        setIsLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isLoaded,
    };
}
