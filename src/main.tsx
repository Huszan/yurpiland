import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import GlobalStates from "./context/GlobalStates.tsx";
import Progression from "./context/Progression.tsx";
import { SaveManager } from "./context/SaveManager.tsx";
import Router from "./Router.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GlobalStates>
            <Progression>
                <SaveManager>
                    <Router />
                </SaveManager>
            </Progression>
        </GlobalStates>
    </StrictMode>
);
