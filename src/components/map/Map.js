import { useContext, useEffect, useRef } from 'react'
import { ProgressionContext } from '../../context/Progression'
import { useMapController } from '../../hooks/UseMapController'
import './Map.scss'
import ZoomInSvg from '../../resources/icons/zoom_in.svg';
import ZoomOutSvg from '../../resources/icons/zoom_out.svg';

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

    useEffect(() => {
        const selectedElement = document.getElementsByClassName('selected')[0].parentNode;
        const pos = {
            x: selectedElement.offsetLeft,
            y: selectedElement.offsetTop,
        }
        controller.center(pos);
    }, [])

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

    function onMapElementClick(map) {
        let size = controller.getMapContentSize();
        let position = {
            x: (map.position[0] / 100) * size.x,
            y: (map.position[1] / 100) * size.y,
        };
        maps.set.selected(map.key);
        controller.center(position);
    }

    const mapElements = maps.data.map(map => {
        const isSelected = maps.get.selected === map.key;
        return (
            <button 
                key={ map.key } 
                className='map-element'
                style={{left: `${map.position[0]}%`, top: `${map.position[1]}%`}}
                onClick={ () => onMapElementClick(map) }
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
            <div className='zoom-controls'>
                <button onClick={() => controller.zoomOut()}>
                    <img className='icon-l' src={ZoomOutSvg} />
                </button>
                <button onClick={() => controller.zoomIn()}>
                    <img className='icon-l' src={ZoomInSvg} />
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