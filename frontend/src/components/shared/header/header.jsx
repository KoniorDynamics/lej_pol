import React from 'react';
import './header.css';
import logo from '../../../assets/images/logo.png';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import {useHistory} from 'react-router-dom';

const Header = ({notifications, isAuthenticated}) => {

    const history = useHistory();

    const navigateToBoard = () => {
        history.push('/authenticated/board');
    };

    return (
        <div className="header">
            <img className='header-logo' src={logo}/>
            {(notifications) ? <div className="notification-icon-wrapper">
                <NewReleasesIcon className="notifications-icon" color="action" fontSize={'large'}
                                 onClick={() => {
                                     navigateToBoard();
                                 }}></NewReleasesIcon>
                <span className="notifications-amount">{notifications}</span>
            </div> : null}
        </div>
    )
};

export default Header
