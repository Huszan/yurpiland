import './MapTab.scss';
import Map from '../map/Map';
import MapInfo from '../map-info/MapInfo';
import { useContext, useRef, useState } from 'react';
import MapProgress from '../map-progress/MapProgress';
import { ProgressionContext } from '../../context/Progression';

export default function MapTab() {
    const mapTabRef = useRef();
    const progress = useContext(ProgressionContext);
    const locations = progress.locations;
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <div id='map-tab' ref={mapTabRef}>
            <MapProgress 
                openInfo={() => setIsInfoOpen(true)}
                adventure={progress.adventure}
                location={locations.get.selected}
            />
            <MapInfo 
                location={locations.get.selected} 
                isOpen={isInfoOpen} 
                setIsOpen={setIsInfoOpen}
            />
            <Map />
        </div>
    )
}