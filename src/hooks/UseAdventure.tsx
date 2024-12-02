import { useLoader } from "./UseLoader"

export const useAdventure = (selectedLocation, resources) => {
    const loader = useLoader({
        key: selectedLocation.key,
        interval: selectedLocation.getAdventureTime(),
        cb: () => onFinished(selectedLocation),
        isLooped: selectedLocation.hasAutoSendOn,
    });

    function onFinished(location) {
        if (!location) throw new Error('Adventure finished without location present');
        resources.change(location.getDrop(), 'inc');
    }

    function start(overrideLocation, extractTime) {
        const location = overrideLocation ? overrideLocation : selectedLocation;
        if (loader.data.key !== location.key) {
            loader.stop();
            loader.update({
                key: location.key,
                interval: location.getAdventureTime(),
                cb: () => onFinished(location),
                isLooped: location.hasAutoSendOn,
            })
        }
        loader.start({
            extractTime: extractTime ? extractTime : 0,
        });
    }

    function stop() {
        loader.stop();
    }

    return {
        start,
        stop,
        currentLocationKey: loader.data.key,
        isInProgress: loader.data.isLoading,
        progress: loader.progress,
        loader,
    }
}