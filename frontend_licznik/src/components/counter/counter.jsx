import React, {useState} from 'react';
import background from '../../assets/images/licznik.png';
import './counter.css';

const Counter = ({handleWaterUse, openTap, closeTap}) => {

    const spendWater = (usageType, time) => {
        handleWaterUse(usageType, time);
    };

    return (
        <div className='main-wrapper'>
            <img className='counter-image' src={background} useMap='#map'/>
            <map name="map">
                <area target="" alt="pralka" title="pralka" coords="60,100,158,231" shape="rect" onClick={() => {
                    spendWater('washingMachine')
                }}/>
                <area target="" alt="zmywarka" title="zmywarka" coords="477,283,597,406" shape="rect" onClick={() => {
                    spendWater('dishWashingMachine')
                }}/>
                <area target="" alt="kran" title="kran"
                      coords="282,128,275,113,273,49,290,31,326,32,326,6,365,8,361,30,379,30,378,67,311,66,308,116,299,126"
                      shape="poly" onMouseDown={openTap} onMouseUp={closeTap}/>
                <area target="" alt="prysznic" title="prysznic"
                      coords="431,287,435,231,427,171,447,155,469,169,493,144,529,146,531,188,497,199,466,221,464,286"
                      shape="poly" onClick={() => {
                    spendWater('shower')
                }}/>
            </map>
        </div>
    )
};

export default Counter;
