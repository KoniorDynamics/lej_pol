import React, {useState} from 'react';
import './user-profile.css';
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';
import NatureSharpIcon from '@material-ui/icons/NatureSharp';
import LocalDrinkSharpIcon from '@material-ui/icons/LocalDrinkSharp';
import Button from '@material-ui/core/Button';
import Modal from '../../shared/modal/modal';

const UserProfile = () => {

    const [showModal, setModalState] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        content: null
    });

    const closeModal = () => {
        setModalState(false);
    };

    const openChangePasswordModal = () => {
        setModalConfig({
            title: 'Eeee co będziesz zmieniał, dobre jest',
            content: (
                <Button style={{margin: 'auto'}} variant="contained" color="primary" onClick={closeModal}>No w sumie...</Button>
            )
        });
        setModalState(true);
    };

        const openBlowUpLondonModal = () => {
        setModalConfig({
            title: 'ŁUBUDUDBUDU!',
            content: (
                <img style={{width: '150px', margin: 'auto'}} src="https://upload.wikimedia.org/wikipedia/commons/7/79/Operation_Upshot-Knothole_-_Badger_001.jpg"/>
            )
        });
        setModalState(true);
    };

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
                    <Button variant="contained" color="primary" onClick={() => {openChangePasswordModal()}}>Zmień hasło</Button>
                    <Button variant="contained" color="primary" onClick={() => {openBlowUpLondonModal()}}>Wysadź Londyn</Button>
                </div>
            </div>
            <Modal open={showModal} modalContent={modalConfig.content} modalTitle={modalConfig.title} handleClose={closeModal}></Modal>
        </>
    );
};

export default UserProfile;
