import { useEffect, useRef } from "react";
import { useState } from "react";
import { Loader } from "../types/Loader";

const initialLoaderData: Loader = {
    key: "default", // it's used if you want to recognize last loader
    interval: 1000, // how much time to load
    extractTime: 0,
    isLoading: false, // set to true to start loading
    isLooped: false, // will timer fire itself on finish
    isAutostart: false, // will timer start as soon as initialized
    cb: () => {
        console.log(
            "Loader uses default callback function. Provide it with custom one."
        );
    },
};

export type LoaderHookData = {
    data: Loader;
    progress: number;
    start: () => void;
    stop: () => void;
    update: (data: Partial<Loader>) => void;
    getTimePassed: () => void;
};

export const useLoader = (config: Partial<Loader>): LoaderHookData => {
    const [loaderData, setLoaderData] = useState<Loader>({
        ...initialLoaderData,
        ...config,
    });
    const [progress, setProgress] = useState(0);

    const ref = useRef<undefined | { loaderData: Loader; progress: number }>();
    ref.current = {
        loaderData: loaderData,
        progress: progress,
    };

    function update(data: Partial<Loader>) {
        setLoaderData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }

    function start() {
        if (!ref.current) return;
        const { startTime, interval, isLooped, cb, currTimeout, extractTime } =
            ref.current.loaderData;
        if (startTime || currTimeout) return;
        const timeout = window.setTimeout(() => {
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
        if (!ref.current) return;
        const { currTimeout } = ref.current.loaderData;
        window.clearTimeout(currTimeout);
        update({ startTime: undefined, currTimeout: undefined });
        setProgress(0);
    }

    function getTimePassed() {
        if (!ref.current) return;
        const { startTime } = ref.current.loaderData;
        if (!startTime) return 0;
        const passed = new Date().getTime() - startTime;
        return passed;
    }

    function getProgress() {
        if (!ref.current) return;
        const { startTime, interval } = ref.current.loaderData;
        if (!startTime) return 0;
        const percent = Math.min(
            ((getTimePassed() || 0) / interval) * 100,
            100
        );
        return percent;
    }

    useEffect(() => {
        if (loaderData.isAutostart) {
            start();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!ref.current) return;
        const { isLoading } = ref.current.loaderData;
        if (isLoading) start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaderData]);

    useEffect(() => {
        if (!ref.current) return;
        const { startTime } = ref.current.loaderData;
        const progressInterval = window.setInterval(() => {
            if (startTime) {
                setProgress(getProgress() || 0);
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
        start: () => update({ isLoading: true }),
        stop,
        update,
        getTimePassed,
    };
};
