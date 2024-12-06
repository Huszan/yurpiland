import { createContext } from "react";

export type SaveManagerContextValue = null | {
    saveGame: () => void;
    loadGame: () => boolean;
    isLoaded: boolean;
    setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SaveManagerContext = createContext<SaveManagerContextValue>(null);
