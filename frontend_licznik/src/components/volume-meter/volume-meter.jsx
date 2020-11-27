import React from 'react';
import './volume-meter.css';

const VolumeMeter = ({totalVolume}) => {

    return (
        <div className='metter-wrapper'>
            {
                (() => {
                    const totalVolumeStringArray = totalVolume.toString().split('');
                    const dotIndex = totalVolumeStringArray.indexOf('.');
                    const zeros = [];
                    for (let i = 0; i <= dotIndex; i++) {
                        zeros.push('0');
                    }
                    return [...zeros, ...totalVolumeStringArray].map(
                        (character, index) => {
                            return (
                                <div className="digit-container" key={index}>{character}</div>
                            )
                        }
                    )
                })()
            }
        </div>
    );
};

export default VolumeMeter;
