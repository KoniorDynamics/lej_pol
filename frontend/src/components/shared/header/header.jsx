import React from 'react';
import './header.css';
import logo from '../../../assets/images/logo.png';

const Header = ({title}) => {
    return (
        <div className="header">
            <img className='header-logo' src={logo}/>
        </div>
    )
};

export default Header
