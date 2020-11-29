import React, {useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './authentication.css';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import axios from 'axios';
import Spinner from "../../shared/spinner/spinner";
import Modal from "../../shared/modal/modal";

const Authentication = ({setAuthenticationState, firstTimeAppUsage, setFirstTimeAppUsage}) => {

    const history = useHistory();

    const [showModal, setModalState] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [showSpinner, setSpinnerState] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        content: null
    });

    const authenticate = (event) => {
        setSpinnerState(true);
        event.preventDefault();
        axios.post('http://35.246.205.45:5000/user/login', {email, password})
            .then((response) => {
                setToken(response.data.token);
                setAuthenticationState(true);
                if (firstTimeAppUsage) {
                    setFirstTimeAppUsage(false);
                    history.push('flowmeter-selection');
                } else {
                    history.push('/authenticated/board');
                }
            })
            .catch((error) => {
                setModalConfig({
                    title: 'Error fest!',
                    content: (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <p>Niestety, coś się fest wysypało</p>
                        <Button variant="contained" color="primary" onClick={closeModal}>Oj :(</Button>
                    </div>)
                });
                setModalState(true);
            })
            .finally(() => {
                setSpinnerState(false);
            });
    };

    const onEmailInput = (event) => {
        event.preventDefault();
        const email = event.target.value;
        setEmail(email)
    };

    const onPasswordInput = (event) => {
        event.preventDefault();
        const password = event.target.value;
        setPassword(password)
    };

    const register = (event) => {
        setSpinnerState(true);
        event.preventDefault();
        axios.post('http://35.246.205.45:5000/user/signup', {email, password, name: 'serowyChrupek'})
            .then((response) => {
                if (response.status == 202) {
                    setModalConfig({
                        title: 'Takiego już tu mamy!',
                        content: (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <p>Użytkownik o takiej nazwie już istnieje.</p>
                            <Button variant="contained" color="primary" onClick={closeModal}>Ok!</Button>
                        </div>)
                    });
                    setModalState(true);
                    return;
                }
                setModalConfig({
                    title: 'Sukces!',
                    content: (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <p>Teraz się możesz zalogowac i oszczędzać!</p>
                        <Button variant="contained" color="primary" onClick={closeModal}>Ok!</Button>
                    </div>)
                });
                setModalState(true);
            })
            .catch((error) => {
                alert(error);
            })
            .finally(() => {
                setSpinnerState(false);
            });
    };

    const closeModal = () => {
        setModalState(false);
    };

    return (
        <>
            <div className="authentication-container">
                <form className="authentication-form" onSubmit={(event) => authenticate(event)}>
                    <TextField
                        className="authentication-input"
                        label="Nazwa użytkownika"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) => {
                            onEmailInput(event);
                        }}
                    />
                    <TextField
                        className="authentication-input"
                        label="Hasło"
                        type="password"
                        onChange={(event) => {
                            onPasswordInput(event);
                        }}
                    />
                    <Button className="authentication-button" type="submit" variant="contained" color="primary"
                            disabled={!email || !password}>Zaloguj</Button>
                    {/*<Button className="authentication-button" variant="contained" color="primary"*/}
                    {/*        disabled={!email || !password}*/}
                    {/*        onClick={(event) => register(event)}>Załóż*/}
                    {/*    konto</Button>*/}
                </form>
            </div>
            {showSpinner ? <Spinner></Spinner> : null}
            {showModal ?
                <Modal open={showModal} handleClose={() => {
                    closeModal();
                }} modalTitle={modalConfig.title} modalContent={modalConfig.content}></Modal> :
                null}
        </>
    )

};

export default Authentication;
