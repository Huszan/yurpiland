import { useContext } from 'react';
import { ProgressionContext } from '../../context/Progression';
import { abbreviateNumber } from '../../utils/HelperFunctions';
import './ApCounter.scss';

export default function ApCounter() {
    const { adventurers } = useContext(ProgressionContext);
    const getAp = adventurers.getCumulatedAP;

    return (
        <div className='ap-counter'>
            <span className='title'>AP</span>
            <div className='display'>{ abbreviateNumber( getAp() ) }</div>
        </div>
    )
}