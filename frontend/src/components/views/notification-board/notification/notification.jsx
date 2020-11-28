import React, {useState} from 'react';
import Card from "@material-ui/core/Card";
import './notification.css';

const Notification = ({notification}) => {

    return (
        <Card className='card'>
            <span className="time">{new Date(notification.time).toLocaleString()}</span>
            <p className="title">{notification.title}</p>
            {notification.details && <p className="details">{notification.details}</p>}
        </Card>
    );
};

export default Notification;
