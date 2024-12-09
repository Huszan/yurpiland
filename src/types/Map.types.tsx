export type MapConfig = {
    contentSize: ContentSize;
    isInitialized: boolean;
    zoomSpeed: number;
    zoomLimit: [number, number];
    centerOn: CenterOnOption;
};

export type ContentSize = { x: number; y: number };

export type CenterOnOption = "location" | "map" | "nothing";
