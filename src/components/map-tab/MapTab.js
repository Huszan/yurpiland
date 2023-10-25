import './MapTab.scss';
import Map from '../map/Map';
import MapInfo from '../map-info/MapInfo';
import { useContext, useRef, useState } from 'react';
import MapProgress from '../map-progress/MapProgress';
import { ProgressionContext } from '../../context/Progression';

export default function MapTab() {
    const mapTabRef = useRef();
    const progress = useContext(ProgressionContext);
    const locations = progress.get.locations;
    const [isInfoOpen, setIsInfoOpen] = useState(true);

    return (
        <div id='map-tab' ref={mapTabRef}>
            <MapProgress />
            <MapInfo 
                location={locations.get.selected} 
                isOpen={isInfoOpen} 
                setIsOpen={setIsInfoOpen}
            />
            <Map />
        </div>
    )
}