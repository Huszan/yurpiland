import { MapConfig } from "../types/MapConfig";

export const mapConfig: MapConfig = {
    contentSize: {
        x: 1080,
        y: 1080,
    },
    isInitialized: false,
    zoomSpeed: 0.1,
    zoomLimit: [0.2, 2],
    centerOn: "map",
};
