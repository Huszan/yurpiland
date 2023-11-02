import { useEffect, useRef } from "react";
import { useState } from "react";

const initialLoaderData = {
    key: null,                  // it's used if you want to recognize last loader
    startTime: null,            // represents last time loader was started and should be reseted to null on finish
    progress: null,             // should be constantly updated with percentage progress of current timer when on
    interval: 1000,             // how much time to load
    cb: () => { 
        console.log('Loader uses default callback function. Provide it with custom one.') 
    },
    currTimeout: null,
    isStopped: true,
    isLooped: false,            // will timer fire itself on finish
    isAutostart: false,         // will timer start as soon as initialized
}

export const useLoader = (data) => {
    const [loaderData, setLoaderData] = useState({
        ...initialLoaderData,
        ...data,
    });

    let ref = useRef();
    ref.current = {
        loaderData: loaderData,
    }

    function update(data, cb) {
        setLoaderData(prev => {
            return {
                ...prev,
                ...data,
            }
        }, cb)
    }

    function start() {
        const { startTime, interval, isLooped, cb, currTimeout } = ref.current.loaderData;
        if (startTime || currTimeout) return;
        let timeout = window.setTimeout(() => {
            cb();
            if (!isLooped) stop();
            else reset();
        }, interval);
        update({startTime: new Date().getTime(), isStopped: false, currTimeout: timeout});
    }

    function stop() {
        update({isStopped: true});
        reset();
    }

    function reset() {
        const { currTimeout } = ref.current.loaderData;
        window.clearTimeout(currTimeout);
        update({startTime: null, progress: null, currTimeout: null});
    }

    function isLoading() {
        const { startTime } = ref.current.loaderData;
        return startTime !== null;
    }

    function getTimePassed() {
        const { startTime } = ref.current.loaderData;
        if (!startTime) return 0;
        let passed = new Date().getTime() - startTime;
        return passed;
    }

    function getProgress() {
        const { startTime, interval } = ref.current.loaderData;
        if (!startTime) return 0;
        let percent = Math.min((getTimePassed() / interval) * 100, 100);
        return percent;
    }

    useEffect(() => {
        if (ref.current.loaderData.isAutostart) update({isStopped: false});
    }, [])

    useEffect(() => {
        if (!loaderData.isStopped) {
            start();
        }
    }, [loaderData])

    useEffect(() => {
        const { startTime } = ref.current.loaderData;
        const progressInterval = window.setInterval(() => {
            if (startTime) {
                update({progress: getProgress()});
            }
        }, 10)

        return () => {
            window.clearInterval(progressInterval);
        }
    }, [loaderData.startTime])

    return {
        data: loaderData,
        start: () => update({isStopped: false}),
        stop,
        update,
        isLoading,
    }
}