import './MapTab.scss';
import Map from '../map/Map';
import MapInfo from '../map-info/MapInfo';
import { useContext, useRef } from 'react';
import MapProgress from '../map-progress/MapProgress';
import { ProgressionContext } from '../../context/Progression';
import { GlobalStatesContext } from '../../context/GlobalStates';

export default function MapTab() {
    const mapTabRef = useRef();
    const progress = useContext(ProgressionContext);
    const globalStates = useContext(GlobalStatesContext);
    const locations = progress.locations;

    function openInfo() {
        globalStates.setModalData(prev => {
            return {
                ...prev,
                content: <MapInfo 
                    location={locations.get.selected} 
                />,
                isOpen: true,
            }
        })
    }

    return (
        <div id='map-tab' ref={mapTabRef}>
            <MapProgress 
                openInfo={() => openInfo()}
                adventure={progress.adventure}
                location={locations.get.selected}
            />
            <Map />
        </div>
    )
}