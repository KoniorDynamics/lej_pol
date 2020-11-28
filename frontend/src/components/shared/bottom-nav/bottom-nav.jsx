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

const BottomNav = () => {

    const history = useHistory();
    const classes = useStyles();

    return (
        <BottomNavigation
            onChange={(event, newValue) => {
                console.log(newValue);
                history.push(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Home" value="home" icon={<AcUnit/>}/>
            <BottomNavigationAction label="Placeholder" value="placeholder" icon={<AccessAlarm/>}/>
        </BottomNavigation>
    )
};

export default BottomNav;
