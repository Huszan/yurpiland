import { useState, useEffect, useMemo } from "react";

export type WindowInfo = {
    size: {
        width: number;
        height: number;
    };
    isDesktop: boolean;
};

const useWindowInfo = (): WindowInfo => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const isDesktop = useMemo(() => {
        const res = size.width > 600;
        setRootWindowStyle();
        return res;
    }, [size]);

    function setRootWindowStyle() {
        if (size.width > 600)
            document.getElementById("root")!.classList.add("desktop");
        else document.getElementById("root")!.classList.remove("desktop");
    }

    useEffect(() => {
        const onResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return {
        size,
        isDesktop,
    };
};

export { useWindowInfo };
