import React, {useState, useEffect} from 'react';
import Notification from "./notification/notification";
import './notification-board.css';
import Paper from "@material-ui/core/Paper";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";

const NotificationBoard = () => {

    const [notifications, setNotifications] = useState([
        {
            time: Date.now() - 3600000,
            type: 'activityStart',
            title: 'Włączyłeś pralkę!'
        },
        {
            time: Date.now() - 2700000,
            type: 'activityFinished',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }, {
            time: Date.now() - 36000000,
            type: 'activityStart',
            title: 'Włączyłeś pralkę!'
        },
        {
            time: Date.now() - 27000000,
            type: 'activityFinished',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }, {
            time: Date.now() - 360000000,
            type: 'activityStart',
            title: 'Włączyłeś pralkę!'
        },
        {
            time: Date.now() - 270000000,
            type: 'activityFinished',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }
    ]);
    const [notificationsToShow, setNotificationsToShow] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(() => {
        setNotificationsToShow(notifications);
    }, [notifications]);

    const filterNotifications = (filterQuery) => {
        setFilterQuery(filterQuery);
        const filteredNotifications = notifications.filter(
            notification => {
                let filteringResult;
                for (const property in notification) {
                    if (notification[property] && notification[property].includes && notification[property].includes(filterQuery)) {
                        filteringResult = true;
                    }
                }
                return filteringResult;
            }
        );
        setNotificationsToShow(filteredNotifications);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchInput = event.target[0].value;
        filterNotifications(searchInput);
    };

    return (
        <>
            <div className="notification-board">
                <p className='notification-board-title'>Twoja tablica</p>
                <form onSubmit={(e) => handleSearch(e)}>
                    <Paper className="input-container">
                        <InputBase
                            className="search-input"
                            placeholder="search"
                        />
                        <IconButton type="submit" className="search-icon">
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </form>
                {notificationsToShow.sort((a, b) => b.time - a.time).map(
                    (notification, i) => {
                        return (
                            <Notification notification={notification} key={i}/>
                        )
                    }
                )}
            </div>
        </>
    );
};

export default NotificationBoard;
