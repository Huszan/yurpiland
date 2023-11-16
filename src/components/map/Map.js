import { useContext, useEffect, useRef } from 'react'
import { ProgressionContext } from '../../context/Progression'
import { useMapController } from '../../hooks/UseMapController'
import './Map.scss'
import ZoomInSvg from '../../resources/icons/zoom_in.svg';
import ZoomOutSvg from '../../resources/icons/zoom_out.svg';
import ArrowUpSvg from '../../resources/icons/arrow_up.svg';
import ArrowDownSvg from '../../resources/icons/arrow_down.svg';
import ArrowLeftSvg from '../../resources/icons/arrow_left.svg';
import ArrowRightSvg from '../../resources/icons/arrow_right.svg';
import AdjustSvg from '../../resources/icons/adjust.svg';
import { GlobalStatesContext } from '../../context/GlobalStates';
import { CENTER_ON_OPTION } from '../../utils/DataSettings';

export default function Map() {
    const mapRef = useRef();
    const mapContentRef = useRef();
    const progress = useContext(ProgressionContext);
    const { settings, setSettings, mapControls, setMapControls} = useContext(GlobalStatesContext);
    const mapControlsState = [mapControls, setMapControls];
    const controller = useMapController(
        mapRef, 
        settings.map, 
        mapControlsState,
    );

    const locations = progress.locations;
    let isDragging = false;
    let previousTouch;
    let clearPreviousTouchTimeout;

    useEffect(() => {
        setupMapStyle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controller])

    useEffect(() => {
        if (!settings.map.isInitialized) {
            initializeMap();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function initializeMap() {
        onCenter();
        setSettings(prev => {
            return {
                ...prev,
                map: {
                    ...prev.map,
                    isInitialized: true,
                }
            }
        })
    }

    function setupMapStyle() {
        let el = mapContentRef.current;
        const mapContentSize = controller.getMapContentSize();
        el.style.width = `${mapContentSize.x}px`;
        el.style.height = `${mapContentSize.y}px`;
        el.style.transform = `translate(
            ${controller.data.position[0]}px,
            ${controller.data.position[1]}px
        )`
    }

    function onMapScroll(event) {
        event.preventDefault();
        if (event.deltaY < 0) controller.zoomIn();
        else controller.zoomOut();
    }

    useEffect(() => {
        const refCaptured = mapRef.current;
        const mouseDownListener = refCaptured.addEventListener('mousedown', () => onMouseDownOnMap());
        const mouseUpListener = refCaptured.addEventListener('mouseup', () => onMouseUpOnMap());
        const mouseLeaveListener = refCaptured.addEventListener('mouseleave', () => onMouseUpOnMap());
        const mouseMoveListener = refCaptured.addEventListener('mousemove', (e) => onMouseMoveOnMap(e));
        const touchMoveListener = refCaptured.addEventListener('touchmove', (e) => onTouchMoveOnMap(e), {passive: false});
        const scrollListener = refCaptured.addEventListener('wheel', (e) => onMapScroll(e), {passive: false});

        return () => {
            refCaptured.removeEventListener('mousedown', mouseDownListener);
            refCaptured.removeEventListener('mouseup', mouseUpListener);
            refCaptured.removeEventListener('mouseleave', mouseLeaveListener);
            refCaptured.removeEventListener('mousemove', mouseMoveListener);
            refCaptured.removeEventListener('touchmove', touchMoveListener);
            refCaptured.removeEventListener('wheel', scrollListener);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function onMouseDownOnMap() {
        mapRef.current.style.cursor = 'move';
        isDragging = true;
    }

    function onMouseUpOnMap() {
        mapRef.current.style.cursor = 'unset';
        isDragging = false;
    }

    function onMouseMoveOnMap(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (isDragging) {
            let x = event.movementX;
            let y = event.movementY;

            controller.drag([x, y]);
        }
    }

    function onTouchMoveOnMap(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const touch = event.touches[0];

        if (previousTouch) {
            let x = touch.pageX - previousTouch.pageX;
            let y = touch.pageY - previousTouch.pageY;
    
            controller.drag([x, y]);
            if (clearPreviousTouchTimeout) window.clearTimeout(clearPreviousTouchTimeout);
            clearPreviousTouchTimeout = window.setTimeout(() => previousTouch = null, 100);
        };
    
        previousTouch = touch;
    }

    function onMapElementClick(map) {
        let size = controller.getMapContentSize();
        let position = {
            x: (map.position[0] / 100) * size.x,
            y: (map.position[1] / 100) * size.y,
        };
        locations.set.selected(map);
        if (settings.map.centerOn === CENTER_ON_OPTION.LOCATION) {
            controller.center(position);
        }
    }

    function onCenter() {
        const selectedElement = document.getElementsByClassName('selected')[0].parentNode;
        if (settings.map.centerOn === CENTER_ON_OPTION.LOCATION) {
            centerOnLocation(selectedElement);
        }
        else if (settings.map.centerOn === CENTER_ON_OPTION.MAP) {
            controller.center();
        }
    }

    function centerOnLocation(element) {
        const position = {
            x: element.offsetLeft,
            y: element.offsetTop,
        }
        controller.center(position)
    }

    const mapElements = locations.data.map(map => {
        const isSelected = locations.get.selected.key === map.key;
        return (
            <button 
                key={ map.key } 
                className='map-element'
                style={{left: `${map.position[0]}%`, top: `${map.position[1]}%`}}
                onClick={ () => onMapElementClick(map) }
            >
                <img className={isSelected ? 'selected' : ''} src={ isSelected ? map.iconSelected : map.icon } alt='' />
            </button>
        )
    })

    return (
        <section 
            id='map'
            ref={mapRef}
        >
            <div className='zoom-controls'>
                <button onClick={() => controller.zoomOut()}>
                    <img className='icon-l' src={ZoomOutSvg} alt='' />
                </button>
                <button onClick={() => controller.zoomIn()}>
                    <img className='icon-l' src={ZoomInSvg} alt='' />
                </button>
            </div>
            <div className='pos-controls'>
                <button className='up' onClick={() => controller.drag([0, 100])}>
                    <img className='icon-l' src={ArrowUpSvg} alt='' />
                </button>
                <button className='down' onClick={() => controller.drag([0, -100])}>
                    <img className='icon-l' src={ArrowDownSvg} alt='' />
                </button>
                <button className='left' onClick={() => controller.drag([100, 0])}>
                    <img className='icon-l' src={ArrowLeftSvg} alt='' />
                </button>
                <button className='right' onClick={() => controller.drag([-100, 0])}>
                    <img className='icon-l' src={ArrowRightSvg} alt='' />
                </button>
                <button className='center' onClick={() => controller.center()}>
                    <img className='icon-l' src={AdjustSvg} alt='' />
                </button>
            </div>
            <div 
                className='map-content'
                ref={mapContentRef}
            >
                { mapElements }
            </div>
        </section>
    )
}