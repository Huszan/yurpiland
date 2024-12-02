import { useContext } from "react";
import "./App.scss";
import { GlobalStatesContext } from "./context/GlobalStates";
import { useAppLoader } from "./hooks/UseAppLoader";
import { SaveManagerContext } from "./context/SaveManager";
import Modal from "./components/modal/modal";
import NavDrawer from "./components/nav-drawer/NavDrawer";
import { Outlet } from "react-router-dom";
import LoadingScreen from "./components/loading-screen/LoadingScreen";

function App() {
    const globalStates = useContext(GlobalStatesContext);
    const saveManager = useContext(SaveManagerContext);
    const appLoader = useAppLoader(saveManager);

    if (!appLoader.isLoaded) {
        return <LoadingScreen />;
    }

    function closeModal() {
        globalStates.setModalData((prev) => {
            return {
                ...prev,
                isOpen: false,
            };
        });
    }

    return (
        <div className="App">
            <div className="App--background" />
            {globalStates.modalData.isOpen && (
                <Modal
                    content={globalStates.modalData.content}
                    onClose={closeModal}
                />
            )}
            <NavDrawer />
            <Outlet />
        </div>
    );
}

export default App;
