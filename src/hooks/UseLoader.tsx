import { useEffect, useRef } from "react";
import { useState } from "react";

const initialLoaderData = {
    key: null, // it's used if you want to recognize last loader
    startTime: null, // represents last time loader was started and should be reseted to null on finish
    interval: 1000, // how much time to load
    extractTime: 0,
    cb: () => {
        console.log(
            "Loader uses default callback function. Provide it with custom one."
        );
    },
    currTimeout: null,
    isLoading: false, // set to true to start loading
    isLooped: false, // will timer fire itself on finish
    isAutostart: false, // will timer start as soon as initialized
};

export const useLoader = (config) => {
    const [loaderData, setLoaderData] = useState({
        ...initialLoaderData,
        ...config,
    });
    const [progress, setProgress] = useState(0);

    let ref = useRef();
    ref.current = {
        loaderData: loaderData,
        progress: progress,
    };

    function update(data) {
        setLoaderData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }

    function start() {
        const { startTime, interval, isLooped, cb, currTimeout, extractTime } =
            ref.current.loaderData;
        if (startTime || currTimeout) return;
        let timeout = window.setTimeout(() => {
            cb();
            if (isLooped) reset();
            else stop();
        }, interval - extractTime);
        update({
            startTime: new Date().getTime() - extractTime,
            currTimeout: timeout,
        });
    }

    function stop() {
        update({ isLoading: false, extractTime: 0 });
        reset();
    }

    function reset() {
        const { currTimeout } = ref.current.loaderData;
        window.clearTimeout(currTimeout);
        update({ startTime: null, currTimeout: null });
        setProgress(0);
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
        if (loaderData.isAutostart) {
            start();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { isLoading } = ref.current.loaderData;
        if (isLoading) start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaderData]);

    useEffect(() => {
        const { startTime } = ref.current.loaderData;
        const progressInterval = window.setInterval(() => {
            if (startTime) {
                setProgress(getProgress());
            }
        }, 10);

        return () => {
            window.clearInterval(progressInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaderData]);

    return {
        data: loaderData,
        progress,
        start: (data) => update({ isLoading: true, ...data }),
        stop,
        update,
        getTimePassed,
    };
};
