import { useState, useRef } from "react"
import { clamp } from "../utils/HelperFunctions";

const initialControlsTemp = {
    zoom: 1,
    position: [0, 0],
}

const initialSettingsTemp = {
    zoomSpeed: 0.1,
    zoomLimit: [0.8, 1.5],
}

export const useMapController = (
    refs,
    initialControls = initialControlsTemp, 
    initialSettings = initialSettingsTemp,
) => {
    const [settings, setSettings] = useState(initialSettings);
    const [controls, setControls] = useState(initialControls);
    const stateRef = useRef();
    stateRef.current = {
        settings,
        controls,
    }

    function getMapSize() {
        const map = refs.mapRef.current;
        return {
            x: map.offsetWidth,
            y: map.offsetHeight,
        }
    }

    function getMapContentSize() {
        const content = refs.mapContentRef.current;
        const controlsRef = stateRef.current.controls;

        return {
            x: content.offsetWidth * controlsRef.zoom,
            y: content.offsetHeight * controlsRef.zoom,
        }
    }

    function getDragLimit() {
        let mapSize = getMapSize();
        let contentSize = getMapContentSize();

        return {
            x: Math.max((contentSize.x - mapSize.x), 0) + 200,
            y: Math.max((contentSize.y - mapSize.y), 0) + 200,
        }
    }

    function clampedPosition(pos) {
        const lim = getDragLimit();
        return [
            clamp(pos[0], -lim.x, 100),
            clamp(pos[1], -lim.y, 100),
        ]
    }

    function zoomIn() {
        setControls(prev => {
            let newZoom = prev.zoom + (prev.zoom * settings.zoomSpeed);
            newZoom = clamp(newZoom, settings.zoomLimit[0], settings.zoomLimit[1]);

            return {
                ...prev,
                position: clampedPosition(prev.position),
                zoom: newZoom,
            }
        })
    }

    function zoomOut() {
        setControls(prev => {
            let newZoom = prev.zoom - (prev.zoom * settings.zoomSpeed);
            newZoom = clamp(newZoom, settings.zoomLimit[0], settings.zoomLimit[1]);

            return {
                ...prev,
                position: clampedPosition(prev.position),
                zoom: newZoom,
            }
        })
    }

    function drag(pos) {
        const controlsRef = stateRef.current.controls;

        setControls(prev => {
            let newX = prev.position[0] + (pos[0] / controlsRef.zoom);
            let newY = prev.position[1] + (pos[1] / controlsRef.zoom);
            const newPos = clampedPosition([newX, newY]);

            return {
                ...prev,
                position: newPos,
            }
        })
    }

    return {
        data: controls,
        zoomIn,
        zoomOut,
        drag,
    }
}