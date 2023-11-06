import { useLoader } from "./UseLoader"

export const useAdventure = (location, resources) => {
    const loader = useLoader({
        key: location.key,
        interval: location.getAdventureTime(),
        cb: onFinished,
        isLooped: location.hasAutoSendOn,
    });

    function onFinished() {
        if (!location) throw new Error('Adventure finished without location present');
        resources.change(location.getDrop(), 'inc');
    }

    function start() {
        if (loader.data.key !== location.key) {
            loader.stop();
            loader.update({
                key: location.key,
                interval: location.getAdventureTime(),
                cb: onFinished,
                isLooped: location.hasAutoSendOn,
            })
        }
        loader.start();
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
    }
}