import { useEffect, useState } from "react";

export function useAppLoader(saveManager) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        saveManager.loadGame();
        setIsLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        isLoaded,
    }
}