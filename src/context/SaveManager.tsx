import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { encrypt, decrypt } from "../utils/Encryption.utils";
import { useProgression } from "../hooks/UseProgression";
import { ResourceCollection } from "../types/Resource.types";
import { SaveManagerContext } from "./SaveManager.context";
import { AdventurersHookData } from "../hooks/UseAdventurers";
import { GlobalModifiers } from "../types/Progress.types";
import { Save } from "../types/Save.types";

export function SaveManager(props: PropsWithChildren) {
    const { children } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const progress = useProgression();
    const saveInterval = useRef<NodeJS.Timeout | null>(null);

    if (saveInterval?.current) {
        clearInterval(saveInterval.current);
    }

    saveInterval.current = setInterval(saveGame, 300000);

    function getResourcesData(): Partial<ResourceCollection> {
        const resources = progress.resources.data;
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
        const adventurers = progress.adventurers;
        const data = adventurers.data.map((el) => {
            return {
                level: el.level,
                multiplier: el.multiplier,
            } as Partial<AdventurersHookData>;
        });
        return data;
    }

    function injectAdventurers(data: Partial<AdventurersHookData>[]) {
        progress.adventurers.data.forEach((adventurer, i) => {
            adventurer.set((prev) => {
                return {
                    ...prev,
                    ...data[i],
                };
            });
        });
    }

    function getGlobalModifiersData() {
        const globalModifiers = progress.get.globalModifiers;
        return globalModifiers;
    }

    function injectGlobalModifiers(data: GlobalModifiers) {
        progress.set.globalModifiers(data);
    }

    function getLocationsData(): Partial<Location>[] {
        const locations = progress.locations.data.map((el) => {
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
        progress.locations.data.forEach((el, i) => {
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
        const adventure = progress.adventure;
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
        const adventure = progress.adventure;
        const location = progress.locations.data.find(
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
        if (isLoaded === false) return;
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
        window.addEventListener("beforeunload", saveGame);
        return () => window.removeEventListener("beforeunload", saveGame);
    }, [saveGame]);

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
