import React from 'react';
import './web-wrapper.css';
import logo from '../../assets/images/mock_phone.png';

const Wrapper = (props: {app: any}) => {

    return (
        <div className="app-wrapper">
            <div className="image-container">
                <img src={logo} alt="" className="phone-image"/>
                <div className="app-container">
                    {props.app}
                </div>
            </div>
        </div>
    )
};

export default Wrapper;
