import React, {useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './authentication.css';
import { useHistory } from 'react-router-dom';

const Authentication = ({setAuthenticationState}) => {

    const history = useHistory();

    const [username, setUsername] = useState('');

    const authenticate = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        setAuthenticationState(true);
        history.push('flowmeter-selection');
    };
    
    const onUsernameInput = (event) => {
        event.preventDefault();
        const username = event.target.value;
        setUsername(username)
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
                <Button type="submit" variant="contained" color="primary" disabled={!username}>Zaloguj</Button>
            </form>
        </div>
    )
};

export default Authentication;
