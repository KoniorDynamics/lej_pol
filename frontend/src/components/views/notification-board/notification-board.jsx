import React, {useState, useEffect} from 'react';
import Notification from "./notification/notification";
import './notification-board.css';
import Paper from "@material-ui/core/Paper";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";

const NotificationBoard = ({notifications, resetUnreadNotificationNumber}) => {

    const [notificationsToShow, setNotificationsToShow] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(() => {
        resetUnreadNotificationNumber();
        setNotificationsToShow(notifications);
    }, [notifications]);

    const filterNotifications = (filterQuery) => {
        setFilterQuery(filterQuery);
        const filteredNotifications = notifications.filter(
            notification => {
                let filteringResult;
                for (const property in notification) {
                    if ((notification[property] && notification[property].includes && notification[property].includes(filterQuery)) ||
                        (notification[property] && notification[property].toLowerCase && notification[property].toLowerCase().includes(filterQuery.toLowerCase()))) {
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

    const getSeparatedNotifications = (notificationsSet) => {
        const today = new Date().toLocaleDateString();
        const tempDate = new Date();
        tempDate.setDate(tempDate.getDate() - 1);
        const yesterday = tempDate.toLocaleDateString();
        const tempNotificationsObject = {};
        notificationsSet.forEach(
            notification => {
                const notificationDate = new Date(notification.timestamp).toLocaleDateString();
                if (tempNotificationsObject[notificationDate]) {
                    tempNotificationsObject[notificationDate].push(notification);
                } else {
                    tempNotificationsObject[notificationDate] = [notification];
                }
            }
        );
        const separatedNotificationsArray = [];
        for (const date in tempNotificationsObject) {
            let notificationDate;
            if (date === today) {
                notificationDate = "Dzisiaj";
            } else if (date === yesterday) {
                notificationDate = "Wczoraj"
            } else {
                notificationDate = date;
            }
            separatedNotificationsArray.push({
                date: notificationDate,
                notifications: tempNotificationsObject[date]
            })
        }
        return separatedNotificationsArray || [];
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
                {getSeparatedNotifications(notificationsToShow.sort((a, b) => b.timestamp - a.timestamp)).map(
                    (notificationSet, i) => {
                        return (
                            <div key={notificationSet.date}>
                                <hr className="notification-separator"/>
                                <p className="notification-date">{notificationSet.date}</p>
                                {notificationSet.notifications && notificationSet.notifications.map(
                                    (notification, i) => {
                                        return (
                                            <Notification notification={notification} key={i}/>
                                        )
                                    }
                                )}
                            </div>
                        )
                    }
                )}
            </div>
        </>
    );
};

export default NotificationBoard;
