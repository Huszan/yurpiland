import { createContext, useState } from "react";

export const GlobalStatesContext = createContext();

export default function GlobalStates(props) {
    const { children } = props;
    const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
    const [modalData, setModalData] = useState({
        content: <ul>
            <li>Test1</li>
            <li>Test2</li>
            <li>Test3</li>
            <li>Test4</li>
            <li>Test5</li>
            <li>Test6</li>
            <li>Test7</li>
            <li>Test8</li>
        </ul>,
        isOpen: true,
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