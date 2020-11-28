import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {AccessAlarm, AcUnit} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
});

const BottomNav = ({setAuthenticationState}) => {

    const history = useHistory();
    const classes = useStyles();

    const logout = () => {
        setAuthenticationState(false);
        history.push('/');
    };

    return (
        <BottomNavigation
            onChange={(event, newValue) => {
                history.push(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Board" value="board" icon={<AccessAlarm/>}/>
            <BottomNavigationAction label="Logout" icon={<AcUnit/>} onClick={() => {
                logout();
            }}/>
        </BottomNavigation>
    )
};

export default BottomNav;
