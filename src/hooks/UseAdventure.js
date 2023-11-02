import { useLoader } from "./UseLoader"

export const useAdventure = (location, resources) => {
    const loader = useLoader({
        key: location.key,
        interval: location.getAdventureTime(),
        cb: onFinished,
        isLooped: true,
        isAutostart: true,
    });

    function onFinished() {
        if (!location) throw new Error('Adventure finished without location present');
        resources.change(location.getDrop(), 'inc');
    }

    function start() {
        if (loader.data.key !== location.key) {
            loader.update({
                key: location.key,
                interval: location.getAdventureTime(),
                cb: onFinished,
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
        isInProgress: loader.isLoading(),
        progress: loader.data.progress,
    }
}