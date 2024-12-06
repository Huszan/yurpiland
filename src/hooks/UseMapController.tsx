import { useRef } from "react";
import { clamp } from "../utils/HelperFunctions.utils";
import { MapConfig } from "../types/Map.types";
import { MapControls } from "../context/GlobalStates";

export const useMapController = (
    mapRef: React.MutableRefObject<HTMLElement | null>,
    mapConfig: MapConfig,
    mapControlsState: [
        MapControls,
        React.Dispatch<React.SetStateAction<MapControls>>
    ]
) => {
    const [controls, setControls] = mapControlsState;
    const stateRef = useRef<
        undefined | { config: MapConfig; controls: MapControls }
    >();

    stateRef.current = {
        config: mapConfig,
        controls,
    };

    function getMapSize() {
        const map = mapRef.current;

        return {
            x: map?.offsetWidth || 0,
            y: map?.offsetHeight || 0,
        };
    }

    function getMapContentSize() {
        const configRef = stateRef.current?.config;
        const controlsRef = stateRef.current?.controls;

        if (!configRef || !controlsRef)
            return {
                x: 0,
                y: 0,
            };

        return {
            x: configRef.contentSize.x * controlsRef.zoom,
            y: configRef.contentSize.y * controlsRef.zoom,
        };
    }

    function getDragLimit() {
        const mapSize = getMapSize();
        const contentSize = getMapContentSize();
        const diff = {
            x: -(contentSize.x - mapSize.x),
            y: -(contentSize.y - mapSize.y),
        };

        return {
            x: {
                min: (diff.x < 0 ? diff.x : 0) - contentSize.x / 2,
                max: (diff.x > 0 ? diff.x : 0) + contentSize.x / 2,
            },
            y: {
                min: (diff.y < 0 ? diff.y : 0) - contentSize.y / 2,
                max: (diff.y > 0 ? diff.y : 0) + contentSize.y / 2,
            },
        };
    }

    function getCenterPos() {
        const lim = getDragLimit();

        return [(lim.x.min + lim.x.max) / 2, (lim.y.min + lim.y.max) / 2];
    }

    function offsetFromCenter(offset: { x: number; y: number }) {
        if (!offset) return null;
        const size = getMapContentSize();

        return {
            x: -(offset.x - size.x / 2),
            y: -(offset.y - size.y / 2),
        };
    }

    function clampedPosition(pos: [number, number]) {
        const lim = getDragLimit();
        const clampedPos = [
            clamp(pos[0], lim.x.min, lim.x.max),
            clamp(pos[1], lim.y.min, lim.y.max),
        ];

        return clampedPos;
    }

    function zoomIn() {
        setControls((prev) => {
            let newZoom = prev.zoom + prev.zoom * mapConfig.zoomSpeed;
            newZoom = clamp(
                newZoom,
                mapConfig.zoomLimit[0],
                mapConfig.zoomLimit[1]
            );

            return {
                ...prev,
                position: clampedPosition(prev.position),
                zoom: newZoom,
            } as MapControls;
        });
    }

    function zoomOut() {
        setControls((prev) => {
            let newZoom = prev.zoom - prev.zoom * mapConfig.zoomSpeed;
            newZoom = clamp(
                newZoom,
                mapConfig.zoomLimit[0],
                mapConfig.zoomLimit[1]
            );

            return {
                ...prev,
                position: clampedPosition(prev.position),
                zoom: newZoom,
            } as MapControls;
        });
    }

    function drag(pos: [number, number]) {
        setControls((prev) => {
            const newX = prev.position[0] + pos[0];
            const newY = prev.position[1] + pos[1];
            const newPos = clampedPosition([newX, newY]);

            return {
                ...prev,
                position: newPos,
            } as MapControls;
        });
    }

    function center(pos?: { x: number; y: number }) {
        const centerPos = getCenterPos();
        setControls((prev) => {
            const offset = pos ? offsetFromCenter(pos) : null;
            const newPos = clampedPosition([
                centerPos[0] + (offset ? offset.x : 0),
                centerPos[1] + (offset ? offset.y : 0),
            ]);

            return {
                ...prev,
                position: newPos,
            } as MapControls;
        });
    }

    return {
        data: controls,
        zoomIn,
        zoomOut,
        drag,
        getMapContentSize,
        center,
    };
};
