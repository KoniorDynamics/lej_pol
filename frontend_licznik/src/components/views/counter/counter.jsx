import React, {useState} from 'react';
import background from '../../../assets/images/licznik.png';
import './counter.css';

const Counter = ({handleWaterUse}) => {

    const [tapOpenTime, setTapOpenTime] = useState(0);

    const spendWater = (usageType, time) => {
        handleWaterUse(usageType, time);
    };


    const openTap = () => {
        setTapOpenTime(Date.now());
    };

    const closeTap = () => {
        const tapUsingTime = Date.now() - tapOpenTime;
        spendWater('tap', tapUsingTime);
    };

    return (
        <div className='main-wrapper'>
            <img className='counter-image' src={background} useMap='#map'/>
            <map name="map">
                <area target="" alt="pralka" title="pralka" coords="96,165,262,384" shape="rect" onClick={() => {
                    spendWater('washingMachine')
                }}/>
                <area target="" alt="zmywarka" title="zmywarka" coords="995,679,796,470" shape="rect" onClick={() => {
                    spendWater('dishWashingMachine')
                }}/>
                <area target="" alt="kran" title="kran"
                      coords="477,217,453,190,457,80,486,48,542,52,539,10,602,12,603,44,633,52,630,104,521,116,511,201"
                      shape="poly" onMouseDown={() => {
                    openTap()
                }} onMouseUp={() => {
                    closeTap()
                }}/>
                <area target="" alt="prysznic" title="prysznic"
                      coords="721,481,721,394,712,327,713,294,749,256,771,280,832,236,889,257,888,318,831,324,783,372,772,481"
                      shape="poly" onClick={() => {
                    spendWater('shower')
                }}/>
            </map>
        </div>
    )
};

export default Counter;
