import React, {useState, useEffect} from 'react';
import './user-profile.css';
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';
import NatureSharpIcon from '@material-ui/icons/NatureSharp';
import LocalDrinkSharpIcon from '@material-ui/icons/LocalDrinkSharp';
import Button from '@material-ui/core/Button';
import Modal from '../../shared/modal/modal';
import axios from 'axios';

const UserProfile = () => {

    const [showModal, setModalState] = useState(false);
    const [showSpinner, setSpinnerState] = useState(false);
    const [userData, setUserData] = useState({
        points: 0,
        water_cost: 0,
        water_usage: 0
    });
    const [modalConfig, setModalConfig] = useState({
        title: '',
        content: null
    });

    useEffect(() => {
        setSpinnerState(true);
        axios.get('http://35.246.205.45:5000/user/stats')
            .then(
                response => {
                    setUserData(response.data);
                }
            )
            .catch(
                error => {
                    setModalConfig({
                        title: 'Error fest!',
                        content: (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <p>Niestety, coś się fest wysypało</p>
                            <Button variant="contained" color="primary" onClick={closeModal}>Oj :(</Button>
                        </div>)
                    });
                    setModalState(true);
                }
            )
            .finally(() => {
                setSpinnerState(false);
            });
    }, []);

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
                <p className='user-profile-value'>{userData.points}</p>
                <hr/>
                <p className='user-profile-subtitle'>Od początku miesiąca zużyłeś: </p>
                <p className='user-profile-value'>{userData.water_usage} m<sup>3</sup> wody i kosztowało Cię to {userData.water_cost}zł</p>
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

                </div>
            </div>
            <Modal open={showModal} modalContent={modalConfig.content} modalTitle={modalConfig.title} handleClose={closeModal}></Modal>
        </>
    );
};

export default UserProfile;
