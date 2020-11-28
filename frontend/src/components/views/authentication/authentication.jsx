import React, {useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './authentication.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Authentication = ({setAuthenticationState}) => {

    const history = useHistory();

    const [username, setUsername] = useState('');

    const authenticate = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        axios.post('http://127.0.0.1:5000/authenticate', {username})
            .then(() => {
                setAuthenticationState(true);
                history.push('flowmeter-selection');
            })
            .catch(() => {
                alert('pupa');
            });

    };

    const onUsernameInput = (event) => {
        event.preventDefault();
        const username = event.target.value;
        setUsername(username)
    };

    const register = () => {
        axios.post('http://127.0.0.1:5000/register', {username})
            .then(() => {
                setAuthenticationState(true);
                history.push('/register');
            })
            .catch(() => {
                alert('pupa');
            });
    };

    return (
        <div className="authentication-container">
            <form className="authentication-form" onSubmit={(event) => authenticate(event)}>
                <TextField
                    className="username-input"
                    label="Nazwa użytkownika"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event) => {
                        onUsernameInput(event);
                    }}
                />
                <Button className="authentication-button" type="submit" variant="contained" color="primary" disabled={!username}>Zaloguj</Button>
                <Button className="authentication-button" variant="contained" color="primary" disabled={!username} onClick={() => register()}>Załóż
                    konto</Button>
            </form>
        </div>
    )

};

export default Authentication;
