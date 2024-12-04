import { useState, useEffect } from "react";

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
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 600);

    function setRootWindowStyle() {
        if (window.innerWidth > 600)
            document.getElementById("root")!.classList.add("desktop");
        else document.getElementById("root")!.classList.remove("desktop");
    }

    useEffect(() => {
        function init() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            setIsDesktop(window.innerWidth > 600);
            setRootWindowStyle();
        }

        init();
        window.addEventListener("resize", init);
        return () => {
            window.removeEventListener("resize", init);
        };
    }, []);

    return {
        size,
        isDesktop,
    };
};

export { useWindowInfo };
