import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import GlobalStates from "./context/GlobalStates.tsx";
import Progression from "./context/Progression.tsx";
import { SaveManager } from "./context/SaveManager.tsx";
import Router from "./Router.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GlobalStates>
            <Progression>
                <SaveManager>
                    <DndProvider backend={HTML5Backend}>
                        <Router />
                    </DndProvider>
                </SaveManager>
            </Progression>
        </GlobalStates>
    </StrictMode>
);
