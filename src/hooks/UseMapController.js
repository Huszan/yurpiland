import { useState, useRef } from "react"
import { clamp } from "../utils/HelperFunctions";

const initialControlsTemp = {
    zoom: 1,
    position: [0, 0],
}

const initialSettingsTemp = {
    initialContentSize: {
        x: 1080,
        y: 1080,
    },
    zoomSpeed: 0.1,
    zoomLimit: [0.2, 2],
}

export const useMapController = (
    mapRef,
    initialControls = initialControlsTemp, 
    initialSettings = initialSettingsTemp,
) => {
    const [settings] = useState(initialSettings);
    const [controls, setControls] = useState(initialControls);
    const stateRef = useRef();
    stateRef.current = {
        settings,
        controls,
    }

    function getMapSize() {
        const map = mapRef.current;

        return {
            x: map.offsetWidth,
            y: map.offsetHeight,
        }
    }

    function getMapContentSize() {
        const settingsRef = stateRef.current.settings;
        const controlsRef = stateRef.current.controls;

        return {
            x: settingsRef.initialContentSize.x * controlsRef.zoom,
            y: settingsRef.initialContentSize.y * controlsRef.zoom,
        }
    }

    function getDragLimit() {
        let mapSize = getMapSize();
        let contentSize = getMapContentSize();
        let diff = {
            x: -(contentSize.x - mapSize.x),
            y: -(contentSize.y - mapSize.y),
        }

        return {
            x: {
                min: (diff.x < 0 ? diff.x : 0) - (contentSize.x / 2),
                max: (diff.x > 0 ? diff.x : 0) + (contentSize.x / 2),
            },
            y: {
                min: (diff.y < 0 ? diff.y : 0) - (contentSize.y / 2),
                max: (diff.y > 0 ? diff.y : 0) + (contentSize.y / 2),
            },
        }
    }

    function getCenterPos() {
        const lim = getDragLimit();

        return [
            (lim.x.min + lim.x.max) / 2,
            (lim.y.min + lim.y.max) / 2,
        ]
    }

    function offsetFromCenter(offset) {
        if (!offset) return null;
        const size = getMapContentSize();

        return {
            x: -(offset.x - (size.x / 2)),
            y: -(offset.y - (size.y / 2)),
        }
    }

    function clampedPosition(pos) {
        const lim = getDragLimit();
        const clampedPos = [
            clamp(pos[0], lim.x.min, lim.x.max),
            clamp(pos[1], lim.y.min, lim.y.max),
        ];

        return clampedPos;
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
        setControls(prev => {
            let newX = prev.position[0] + pos[0];
            let newY = prev.position[1] + pos[1];
            const newPos = clampedPosition([newX, newY]);

            return {
                ...prev,
                position: newPos,
            }
        })
    }

    function center(position) {
        let centerPos = getCenterPos();
        setControls(prev => {
            let offset = offsetFromCenter(position);
            let newPos = clampedPosition([
                centerPos[0] + (offset ? offset.x : 0),
                centerPos[1] + (offset ? offset.y : 0),
            ]);

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
        getMapContentSize,
        center,
    }
}