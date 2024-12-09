import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { encrypt, decrypt } from "../utils/Encryption.utils";
import { useProgression } from "../hooks/UseProgression";
import { ProgressionContextValue } from "./Progression.context";
import { ResourceCollection } from "../types/Resource.types";
import { SaveManagerContext } from "./SaveManager.context";
import { AdventurersHookData } from "../hooks/UseAdventurers";
import { GlobalModifiers } from "../types/Progress.types";
import { Save } from "../types/Save.types";

export function SaveManager(props: PropsWithChildren) {
    const { children } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const progress = useProgression();
    const ref = useRef<null | {
        progress: ProgressionContextValue;
        isLoaded: boolean;
    }>();
    ref.current = {
        progress,
        isLoaded,
    };

    function getResourcesData(): Partial<ResourceCollection> {
        if (!ref.current?.progress) throw new Error(`Couldn't load resources`);
        const resources = ref.current.progress.resources.data;
        const data: Partial<ResourceCollection> = {};
        Object.entries(resources).forEach(([key, val]) => {
            data[key] = {
                amount: val.amount,
                multiplier: val.multiplier,
            };
        });
        return data;
    }

    function injectResources(data: Partial<ResourceCollection>) {
        progress.resources.setData((prev) => {
            const newResources: ResourceCollection = {};
            Object.entries(prev).forEach(([key, val]) => {
                newResources[key] = {
                    ...val,
                    ...data[key],
                };
            });
            return newResources;
        });
    }

    function getAdventurersData(): Partial<AdventurersHookData>[] {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);
        const adventurers = ref.current.progress.adventurers;
        const data = adventurers.data.map((el) => {
            return {
                level: el.level,
                multiplier: el.multiplier,
            } as Partial<AdventurersHookData>;
        });
        return data;
    }

    function injectAdventurers(data: Partial<AdventurersHookData>[]) {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);
        ref.current.progress.adventurers.data.forEach((adventurer, i) => {
            adventurer.set((prev) => {
                return {
                    ...prev,
                    ...data[i],
                };
            });
        });
    }

    function getGlobalModifiersData() {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);
        const globalModifiers = ref.current.progress.get.globalModifiers;
        return globalModifiers;
    }

    function injectGlobalModifiers(data: GlobalModifiers) {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);
        ref.current.progress.set.globalModifiers(data);
    }

    function getLocationsData(): Partial<Location>[] {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);
        const locations = ref.current.progress.locations.data.map((el) => {
            return {
                multiplier: el.multiplier,
                acceleration: el.acceleration,
                hasAutoSendBought: el.hasAutoSendBought,
                hasAutoSendOn: el.hasAutoSendOn,
            } as Partial<Location>;
        });
        return locations;
    }

    function injectLocations(data: Partial<Location>[]) {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);
        ref.current.progress.locations.data.forEach((el, i) => {
            el.setLocation((prev) => {
                return {
                    ...prev,
                    ...data[i],
                };
            });
        });
    }

    // TODO: For adventure we need to create something that will
    // simulate passed time between play sessions
    function getAdventureData(): {
        locationKey: string;
        timePassed: number;
    } | null {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);

        const adventure = ref.current.progress.adventure;
        if (!adventure.isInProgress) return null;
        return {
            locationKey: adventure.currentLocationKey,
            timePassed: adventure.loader.getTimePassed(),
        };
    }

    function injectAdventure(data: {
        locationKey: string;
        timePassed: number;
    }) {
        if (!ref.current?.progress) throw new Error(`Couldn't load progress`);
        const adventure = ref.current.progress.adventure;
        const location = ref.current.progress.locations.data.find(
            (el) => el.key === data.locationKey
        );
        adventure.start(location, data.timePassed);
    }

    function getSaveData(): Save {
        return {
            resources: getResourcesData(),
            adventurers: getAdventurersData(),
            globalModifiers: getGlobalModifiersData(),
            locations: getLocationsData(),
            adventure: getAdventureData(),
        };
    }

    function injectDataToProgress(saveData: Save) {
        try {
            if (saveData.resources) injectResources(saveData.resources);
            if (saveData.adventurers) injectAdventurers(saveData.adventurers);
            if (saveData.globalModifiers)
                injectGlobalModifiers(saveData.globalModifiers);
            if (saveData.locations) injectLocations(saveData.locations);
            if (saveData.adventure) injectAdventure(saveData.adventure);
        } catch (e) {
            console.error(e);
        }
    }

    function saveGame() {
        const saveData = getSaveData();
        const saveString = encrypt(saveData);
        localStorage.setItem("saveString", saveString);
    }

    function loadGame() {
        const saveString = localStorage.getItem("saveString");
        if (!saveString) {
            setIsLoaded(true);
            return false;
        }
        const saveData = decrypt(saveString);
        injectDataToProgress(saveData);
        setIsLoaded(true);
        return true;
    }

    useEffect(() => {
        setInterval(() => {
            if (!ref.current) throw new Error(`Couldn't load isLoaded`);
            if (ref.current.isLoaded === false) return;
            saveGame();
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SaveManagerContext.Provider
            value={{
                saveGame,
                loadGame,
                isLoaded,
                setIsLoaded,
            }}
        >
            {children}
        </SaveManagerContext.Provider>
    );
}
