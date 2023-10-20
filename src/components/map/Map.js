import { useContext, useEffect, useRef } from 'react'
import { ProgressionContext } from '../../context/Progression'
import { useMapController } from '../../hooks/UseMapController'
import './Map.scss'

export default function Map(props) {
    const mapRef = useRef();
    const mapContentRef = useRef();

    const controller = useMapController({mapRef, mapContentRef});
    const progress = useContext(ProgressionContext);
    const maps = progress.get.maps;
    let isDragging = false;
    let previousTouch;
    let clearPreviousTouchTimeout;

    useEffect(() => {
        setupMapStyle();
    }, [controller])

    function setupMapStyle() {
        let el = mapContentRef.current;
        el.style.scale = controller.data.zoom;
        el.style.transform = `translate(
            calc(${controller.data.position[0]}px),
            calc(${controller.data.position[1]}px)
        )`
    }

    function onMapScroll(event) {
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

        return () => {
            refCaptured.removeEventListener('mousedown', mouseDownListener);
            refCaptured.removeEventListener('mouseup', mouseUpListener);
            refCaptured.removeEventListener('mouseleave', mouseLeaveListener);
            refCaptured.removeEventListener('mousemove', mouseMoveListener);
            refCaptured.removeEventListener('touchmove', touchMoveListener);
        }
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

    const mapElements = maps.data.map(map => {
        const isSelected = maps.get.selected === map.key;
        return (
            <button 
                key={ map.key } 
                className='map-element'
                style={{left: map.position[0], top: map.position[1]}}
                onClick={() => maps.set.selected(map.key)}
            >
                <img className={isSelected ? 'selected' : ''} src={ isSelected ? map.iconSelected : map.icon } />
            </button>
        )
    })

    return (
        <section 
            id='map'
            onWheel={(e) => onMapScroll(e)}
            ref={mapRef}
        >
            <div 
                className='map-content'
                ref={mapContentRef}
            >
                { mapElements }
            </div>
        </section>
    )
}