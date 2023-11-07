import './MapTab.scss';
import Map from '../map/Map';
import { useRef } from 'react';

export default function MapTab() {
    const mapTabRef = useRef();

    return (
        <div id='map-tab' ref={mapTabRef}>
            <Map />
        </div>
    )
}