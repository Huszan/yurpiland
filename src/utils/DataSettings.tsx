export const CENTER_ON_OPTION = {
    LOCATION: 'location',
    MAP: 'map',
    NOTHING: 'nothing',
}

export const settingsMap = {
    contentSize: {
        x: 1080,
        y: 1080,
    },
    isInitialized: false,
    zoomSpeed: 0.1,
    zoomLimit: [0.2, 2],
    centerOn: CENTER_ON_OPTION.MAP,
}