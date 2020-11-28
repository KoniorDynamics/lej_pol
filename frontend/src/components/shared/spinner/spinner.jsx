import React from 'react';
import './spinner.css';

const Spinner = ({title}) => {
    return (
        <div className="spinner-wrapper">
            <div className="spinner"></div>
            {title && <span className="spinner-title">{title}</span>}
        </div>
    )
};

export default Spinner
