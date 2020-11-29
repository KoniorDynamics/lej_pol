import React from 'react';
import Card from "@material-ui/core/Card";
import './notification.css';
import Chart from "../../../shared/chart/chart";
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';
import NatureSharpIcon from '@material-ui/icons/NatureSharp';
import LocalDrinkSharpIcon from '@material-ui/icons/LocalDrinkSharp';
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom';

const Notification = ({notification}) => {

    const history = useHistory();

    const getIcon = () => {
        switch (notification.badge) {
            case 'kropla':
                return (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{fontSize: '1.5rem', fontWeight: 600}}>Wodoszczędziciel!</p>
                        <InvertColorsSharpIcon fontSize="large" color="primary"/>
                    </div>);
            case 'drzewko':
                return (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{fontSize: '1.5rem', fontWeight: 600}}>Drzewiciel!</p>
                        <NatureSharpIcon fontSize="large" color="primary"/>
                    </div>);
            case 'szklanka':
                return (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{fontSize: '1.5rem', fontWeight: 600}}>Odpadoszczędzacz!</p>
                        <LocalDrinkSharpIcon fontSize="large" color="primary"/>
                    </div>);
        }
    };

    const navigateToMarketplace = () => {
        history.push('/authenticated/market');
    };

    const getAdditionalContent = () => {
        switch (notification.type) {
            case 'stats':
                return (<Chart data={notification.data}></Chart>);
            case 'badge':
                return getIcon();
            case 'marketplace':
                return (
                    <>
                        <img className="marketplace-photo" src={notification.photoUrl} alt=""/>
                        <Button variant="contained" color="primary" onClick={navigateToMarketplace}>Przejdź do
                            Marketu</Button>
                    </>
                );
            case 'decision':
                return (
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                        {notification.options.map(
                            (option, i) => {
                                return (
                                    <Button className="decision-buttons" key={i} variant="contained" color="primary" onClick={() => {
                                        selectUsageOption(option)
                                    }}>
                                        {getUserFriendlyUsageNames(option)}
                                    </Button>
                                );
                            }
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const getUserFriendlyUsageNames = (unfriendlyUsageOption) => {
        const usagesArray = unfriendlyUsageOption.split(' + ');
        return usagesArray.map(
            unfriendlyUsageName => {
                switch (unfriendlyUsageName) {
                    case 'shower':
                        return 'prysznic';
                    case 'tap':
                        return 'kran';
                    case 'washingMachine':
                        return 'pranie';
                    case 'dishwasher':
                        return 'zmywarka';
                    default:
                        return 'Nie powiem.'
                }
            }
        ).join(' i ');
    };

    const selectUsageOption = (option) => {
        // todo tu będziemy wysyłać do bakiendu tę decyzję
    };

    return (
        <Card className={'card ' + notification.type}>
            <span className="time">{new Date(notification.timestamp).toLocaleTimeString()}</span>
            <p className="title">{notification.title}</p>
            {notification.details ? <p className="details">{notification.details}</p> : null}
            {getAdditionalContent()}
        </Card>
    );
};

export default Notification;
