import { useContext, createContext, useEffect, useRef, useState } from "react";
import { encrypt, decrypt } from '../utils/Encryption';
import { ProgressionContext } from "./Progression";

export const SaveManagerContext = createContext();

export function SaveManager(props) {
    const { children } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const progress = useContext(ProgressionContext);
    const ref = useRef();
    ref.current = {
        progress,
        isLoaded,
    }

    function getResourcesData() {
        let resources = ref.current.progress.resources.data;
        let data = {};
        Object.entries(resources).forEach(([key, val]) => {
            data[key] = {
                amount: val.amount,
                multiplier: val.multiplier,
            }
        })
        return data;
    }

    function injectResources(data) {
        progress.resources.setData(prev => {
            let newResources = {};
            Object.entries(prev).forEach(([key, val]) => {
                newResources[key] = {
                    ...val,
                    ...data[key],
                }
            })
            return newResources;
        })
    }

    function getAdventurersData() {
        let adventurers = ref.current.progress.adventurers;
        let data = adventurers.data.map(el => {
            return {
                level: el.level,
                multiplier: el.multiplier,
            }
        });
        return data;
    }

    function injectAdventurers(data) {
        ref.current.progress.adventurers.data.forEach((adventurer, i) => {
            adventurer.set(prev => {
                return {
                    ...prev,
                    ...data[i]
                }
            })
        })
    }

    function getGlobalModifiersData() {
        let globalModifiers = ref.current.progress.get.globalModifiers;
        return globalModifiers;
    }

    function injectGlobalModifiers(data) {
        ref.current.progress.set.globalModifiers(data);
    }

    function getLocationsData() {
        let locations = ref.current.progress.locations.data.map(el => {
            return {
                multiplier: el.multiplier,
                acceleration: el.acceleration,
                hasAutoSendBought: el.hasAutoSendBought,
                hasAutoSendOn: el.hasAutoSendOn,
            }
        })
        return locations;
    }

    function injectLocations(data) {
        ref.current.progress.locations.data.forEach((el, i) => {
            el.setLocation(prev => {
                return {
                    ...prev,
                    ...data[i],
                }
            })
        })
    }

    // TODO: For adventure we need to create something that will
    // simulate passed time between play sessions
    function getAdventureData() {
        let adventure = ref.current.progress.adventure;
        if (!adventure.isInProgress) return null;
        return {
            locationKey: adventure.currentLocationKey,
            timePassed: adventure.loader.getTimePassed(),
        }
    }

    function injectAdventure(data) {
        let adventure = ref.current.progress.adventure;
        let location = ref.current.progress.locations.data.find(
            (el) => el.key === data.locationKey
        );
        adventure.start(location, data.timePassed);
    }

    function getSaveData() {
        return {
            resources: getResourcesData(),
            adventurers: getAdventurersData(),
            globalModifiers: getGlobalModifiersData(),
            locations: getLocationsData(),
            adventure: getAdventureData(),
        }
    }

    function injectDataToProgress(saveData) {
        try {
            if (saveData.resources) injectResources(saveData.resources);
            if (saveData.adventurers) injectAdventurers(saveData.adventurers);
            if (saveData.globalModifiers) injectGlobalModifiers(saveData.globalModifiers);
            if (saveData.locations) injectLocations(saveData.locations);
            if (saveData.adventure) injectAdventure(saveData.adventure);
        } catch(e) {
            console.error(e);
        }
    }

    function saveGame() {
        let saveData = getSaveData();
        let saveString = encrypt(saveData);
        localStorage.setItem('saveString', saveString);
    }

    function loadGame() {
        let saveString = localStorage.getItem('saveString');
        if (!saveString) {
            setIsLoaded(true);
            return false;
        }
        let saveData = decrypt(saveString);
        injectDataToProgress(saveData);
        setIsLoaded(true);
        return true;
    }

    useEffect(() => {
        setInterval(() => {
            if (ref.current.isLoaded === false) return;
            saveGame();
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SaveManagerContext.Provider
            value = {{        
                saveGame,
                loadGame,
                isLoaded, 
                setIsLoaded,
            }}
        >
            { children }
        </SaveManagerContext.Provider>
    )
}