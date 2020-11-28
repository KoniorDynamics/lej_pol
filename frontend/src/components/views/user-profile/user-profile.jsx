import React from 'react';
import './user-profile.css';
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';
import NatureSharpIcon from '@material-ui/icons/NatureSharp';
import LocalDrinkSharpIcon from '@material-ui/icons/LocalDrinkSharp';
import Button from '@material-ui/core/Button';

const UserProfile = () => {

    return (
        <>
            <div className="user-profile-section">
                <p className='user-profile-title'>Twój profil:</p>
                <hr/>
                <p className='user-profile-subtitle'>Twoje punkty: </p>
                <p className='user-profile-value'>69</p>
                <hr/>
                <p className="user-profile-subtitle">Twoje odznaki:</p>
                <div className="badges-container">
                    <InvertColorsSharpIcon className="badge"></InvertColorsSharpIcon>
                    <NatureSharpIcon className="badge"></NatureSharpIcon>
                    <LocalDrinkSharpIcon className="badge"></LocalDrinkSharpIcon>
                </div>
                <hr/>
                <p className="user-profile-subtitle">Ustawienia:</p>
                <div className="settings-buttons-box">
                    <Button variant="contained" color="primary" onClick={() => {alert('Daj spokój, dobre jest.')}}>Zmień hasło</Button>
                    <Button variant="contained" color="primary" onClick={() => {alert('Łubudu.')}}>Wysadź Londyn</Button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
