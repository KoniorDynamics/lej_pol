import React, {useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './authentication.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Spinner from "../../shared/spinner/spinner";

const Authentication = ({setAuthenticationState, firstTimeAppUsage, setFirstTimeAppUsage}) => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [showSpinner, setSpinnerState] = useState(false);

    const authenticate = (event) => {
        setSpinnerState(true);
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/user/login', {email, password})
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
            .catch(() => {
                alert('pupa');
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
        axios.post('http://127.0.0.1:5000/user/signup', {email, password, name: 'serowyChrupek'})
            .then(() => {
                alert('zarejestrowany fest');
            })
            .catch(() => {
                alert('pupa');
            })
            .finally(() => {
                setSpinnerState(false);
            });
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
                    <Button className="authentication-button" variant="contained" color="primary"
                            disabled={!email || !password}
                            onClick={(event) => register(event)}>Załóż
                        konto</Button>
                </form>
            </div>
            {showSpinner && <Spinner></Spinner>}
        </>
    )

};

export default Authentication;
