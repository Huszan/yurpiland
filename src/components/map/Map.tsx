import { useEffect, useRef } from "react";
import { useMapController } from "../../hooks/UseMapController";
import "./Map.scss";
import ZoomInSvg from "../../resources/icons/zoom_in.svg";
import ZoomOutSvg from "../../resources/icons/zoom_out.svg";
import ArrowUpSvg from "../../resources/icons/arrow_up.svg";
import ArrowDownSvg from "../../resources/icons/arrow_down.svg";
import ArrowLeftSvg from "../../resources/icons/arrow_left.svg";
import ArrowRightSvg from "../../resources/icons/arrow_right.svg";
import AdjustSvg from "../../resources/icons/adjust.svg";
import { useGlobalStates } from "../../hooks/UseGlobalStates";
import { MapControls } from "../../context/GlobalStates";
import { useProgression } from "../../hooks/UseProgression";
import { LocationHookData } from "../../hooks/UseLocation";

export default function Map() {
    const mapRef = useRef<HTMLElement | null>(null);
    const mapContentRef = useRef<HTMLDivElement | null>(null);
    const progress = useProgression();
    const { settings, setSettings, mapControls, setMapControls } =
        useGlobalStates();
    const mapControlsState = [mapControls, setMapControls] as [
        MapControls,
        React.Dispatch<React.SetStateAction<MapControls>>
    ];
    const controller = useMapController(
        mapRef,
        settings.mapConfig,
        mapControlsState
    );

    const locations = progress.locations;
    let isDragging = false;
    let previousTouch: Touch | null = null;

    useEffect(() => {
        function setupMapStyle() {
            const el = mapContentRef.current;
            if (!el) return;
            const mapContentSize = controller.getMapContentSize();
            el.style.width = `${mapContentSize.x}px`;
            el.style.height = `${mapContentSize.y}px`;
            el.style.transform = `translate(
                ${controller.data.position[0]}px,
                ${controller.data.position[1]}px
            )`;
        }

        setupMapStyle();
    }, [controller]);

    useEffect(() => {
        function initializeMap() {
            onCenter();
            setSettings((prev) => {
                return {
                    ...prev,
                    mapConfig: {
                        ...prev.mapConfig,
                        isInitialized: true,
                    },
                };
            });
        }

        if (!settings.mapConfig.isInitialized) {
            initializeMap();
        }
    }, []);

    function onMapScroll(event: WheelEvent) {
        event.preventDefault();
        if (event.deltaY < 0) controller.zoomIn();
        else controller.zoomOut();
    }

    useEffect(() => {
        const refCaptured = mapRef.current;
        if (!refCaptured)
            throw new Error(`Map ref cant be undefined during initialization`);
        refCaptured.addEventListener("mousedown", onMouseDownOnMap);
        refCaptured.addEventListener("mouseup", onMouseUpOnMap);
        refCaptured.addEventListener("mouseleave", onMouseUpOnMap);
        refCaptured.addEventListener("mousemove", onMouseMoveOnMap);
        refCaptured.addEventListener("touchmove", onTouchMoveOnMap, {
            passive: false,
        });
        refCaptured.addEventListener("wheel", onMapScroll, { passive: false });

        return () => {
            refCaptured.removeEventListener("mousedown", onMouseDownOnMap);
            refCaptured.removeEventListener("mouseup", onMouseUpOnMap);
            refCaptured.removeEventListener("mouseleave", onMouseUpOnMap);
            refCaptured.removeEventListener("mousemove", onMouseMoveOnMap);
            refCaptured.removeEventListener("touchmove", onTouchMoveOnMap);
            refCaptured.removeEventListener("wheel", onMapScroll);
        };
    }, []);

    function onMouseDownOnMap() {
        if (!mapRef.current) return;
        mapRef.current.style.cursor = "move";
        isDragging = true;
    }

    function onMouseUpOnMap() {
        if (!mapRef.current) return;
        mapRef.current.style.cursor = "unset";
        isDragging = false;
    }

    function onMouseMoveOnMap(event: MouseEvent) {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (isDragging) {
            const x = event.movementX;
            const y = event.movementY;

            controller.drag([x, y]);
        }
    }

    function onTouchMoveOnMap(event: TouchEvent) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const touch = event.touches[0];

        if (previousTouch) {
            const x = touch.pageX - previousTouch.pageX;
            const y = touch.pageY - previousTouch.pageY;

            controller.drag([x, y]);
            window.setTimeout(() => (previousTouch = null), 100);
        }

        previousTouch = touch;
    }

    function onMapElementClick(map: LocationHookData) {
        const size = controller.getMapContentSize();
        const position = {
            x: (map.position[0] / 100) * size.x,
            y: (map.position[1] / 100) * size.y,
        };
        locations.set.selected(map);
        if (settings.mapConfig.centerOn === "location") {
            controller.center(position);
        }
    }

    function onCenter() {
        const selectedElement = document.getElementsByClassName("selected")[0]
            .parentNode as HTMLElement;
        if (settings.mapConfig.centerOn === "location") {
            centerOnLocation(selectedElement);
        } else if (settings.mapConfig.centerOn === "map") {
            controller.center();
        }
    }

    function centerOnLocation(element: HTMLElement) {
        const position = {
            x: element.offsetLeft,
            y: element.offsetTop,
        };
        controller.center(position);
    }

    const mapElements = locations.data.map((location) => {
        const isSelected = locations.get.selected.key === location.key;
        return (
            <button
                key={location.key}
                className="map-element"
                style={{
                    left: `${location.position[0]}%`,
                    top: `${location.position[1]}%`,
                }}
                onClick={() => onMapElementClick(location)}
            >
                <img
                    className={isSelected ? "selected" : ""}
                    src={isSelected ? location.iconSelected : location.icon}
                    alt=""
                />
            </button>
        );
    });

    return (
        <section id="map" ref={mapRef}>
            <div className="zoom-controls">
                <button onClick={() => controller.zoomOut()}>
                    <img className="icon-l" src={ZoomOutSvg} alt="" />
                </button>
                <button onClick={() => controller.zoomIn()}>
                    <img className="icon-l" src={ZoomInSvg} alt="" />
                </button>
            </div>
            <div className="pos-controls">
                <button
                    className="up"
                    onClick={() => controller.drag([0, 100])}
                >
                    <img className="icon-l" src={ArrowUpSvg} alt="" />
                </button>
                <button
                    className="down"
                    onClick={() => controller.drag([0, -100])}
                >
                    <img className="icon-l" src={ArrowDownSvg} alt="" />
                </button>
                <button
                    className="left"
                    onClick={() => controller.drag([100, 0])}
                >
                    <img className="icon-l" src={ArrowLeftSvg} alt="" />
                </button>
                <button
                    className="right"
                    onClick={() => controller.drag([-100, 0])}
                >
                    <img className="icon-l" src={ArrowRightSvg} alt="" />
                </button>
                <button className="center" onClick={() => controller.center()}>
                    <img className="icon-l" src={AdjustSvg} alt="" />
                </button>
            </div>
            <div className="map-content" ref={mapContentRef}>
                {mapElements}
            </div>
        </section>
    );
}
