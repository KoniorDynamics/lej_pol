import React from 'react';
import rotorImg from '../../assets/images/rotor.svg';
import './rotor.css';

const Rotor = ({rotation}) => {
    return (
        <div className="rotor-wrapper">
            <img src={rotorImg} style={{transform: 'rotate(' + rotation + 'deg)'}}/>
        </div>
    );
};

export default Rotor;
