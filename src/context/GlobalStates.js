import { createContext, useState } from "react";

export const GlobalStatesContext = createContext();

export default function GlobalStates(props) {
    const { children } = props;
    const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);


    return (
        <GlobalStatesContext.Provider
            value = {{
                isNavDrawerOpen,
                setIsNavDrawerOpen,
            }}
        >
            { children }
        </GlobalStatesContext.Provider>
    )
}