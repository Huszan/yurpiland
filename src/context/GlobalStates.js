import { createContext, useState } from "react";

export const GlobalStatesContext = createContext();

export default function GlobalStates(props) {
    const { children } = props;
    const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
    const [modalData, setModalData] = useState({
        content: null,
        isOpen: false,
    });


    return (
        <GlobalStatesContext.Provider
            value = {{
                isNavDrawerOpen,
                setIsNavDrawerOpen,
                modalData,
                setModalData,
            }}
        >
            { children }
        </GlobalStatesContext.Provider>
    )
}