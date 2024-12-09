import { LoaderHookData, useLoader } from "./UseLoader";
import { LocationHookData } from "./UseLocation";
import { ResourcesHookData } from "./UseResources";

export type AdventureHookData = {
    start: (overrideLocation?: LocationHookData, extractTime?: number) => void;
    stop: () => void;
    currentLocationKey: string;
    isInProgress: boolean;
    progress: number;
    loader: LoaderHookData;
};

export const useAdventure = (
    selectedLocation: LocationHookData,
    resources: ResourcesHookData
): AdventureHookData => {
    const loader = useLoader({
        key: selectedLocation.key,
        interval: selectedLocation.getAdventureTime(),
        cb: () => onFinished(selectedLocation),
        isLooped: selectedLocation.hasAutoSendOn,
    });

    function onFinished(location: LocationHookData) {
        if (!location)
            throw new Error("Adventure finished without location present");
        resources.change(location.getDrop(), "inc");
    }

    function start(overrideLocation?: LocationHookData, extractTime?: number) {
        const location = overrideLocation ? overrideLocation : selectedLocation;
        if (loader.data.key !== location.key || extractTime) {
            loader.stop();
            loader.update({
                key: location.key,
                interval: location.getAdventureTime(),
                cb: () => onFinished(location),
                isLooped: location.hasAutoSendOn,
                extractTime: extractTime || 0,
            });
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
        loader,
    };
};
