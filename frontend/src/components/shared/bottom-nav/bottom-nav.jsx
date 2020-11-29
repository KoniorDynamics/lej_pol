import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {AccessAlarm} from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShopIcon from '@material-ui/icons/Shop';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 69
    },
});

const BottomNav = ({setAuthenticationState}) => {

    const history = useHistory();
    const classes = useStyles();

    const logout = () => {
        setAuthenticationState(false);
        history.push('/authentication');
    };

    return (
        <BottomNavigation
            onChange={(event, newValue) => {
                history.push(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Powiadomienia" value="/authenticated/board" icon={<AccessAlarm/>}/>
            <BottomNavigationAction label="Profil" value="/authenticated/profile" icon={<AccountCircleIcon/>}/>
            <BottomNavigationAction label="Market" value="/authenticated/market" icon={<ShopIcon/>}/>
            <BottomNavigationAction label="Wyloguj" icon={<ExitToAppIcon/>} onClick={logout}/>
        </BottomNavigation>
    )
};

export default BottomNav;
