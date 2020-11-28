import React from 'react';
import Card from "@material-ui/core/Card";
import './notification.css';
import Chart from "../../../shared/chart/chart";

const Notification = ({notification}) => {

    return (
        <Card className={'card ' + notification.type}>
            <span className="time">{new Date(notification.timestamp).toLocaleTimeString()}</span>
            <p className="title">{notification.title}</p>
            {notification.details && <p className="details">{notification.details}</p>}
            {notification.type === 'stats' ?
                <Chart data={notification.data}></Chart>
                :
                null
            }
        </Card>
    );
};

export default Notification;
