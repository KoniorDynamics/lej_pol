import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Wrapper from "./components/web-wrapper/web-wrapper";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import BottomNav from './components/shared/bottom-nav/bottom-nav'
import NotificationBoard from "./components/views/notification-board/notification-board";
import Container from "@material-ui/core/Container";
import Authentication from "./components/views/authentication/authentication";
import FlowmeterSelection from "./components/views/flowmeter-selection/flowmeter-selection";
import Header from "./components/shared/header/header";
import UserProfile from "./components/views/user-profile/user-profile";
import Market from "./components/views/market/market";
import Modal from "./components/shared/modal/modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Spinner from "./components/shared/spinner/spinner";

function App() {

    const prevNotificationAmount = useRef(0);
    const [isAuthenticated, setAuthenticationState] = useState(false);
    const [unreadNotificationsNumber, setUnreadNotificationsNumber] = useState(0);
    const [showModal, setModalState] = useState(false);
    const [showSpinner, setSpinnerState] = useState(false);
    const [firstFetch, setFirstFetchState] = useState(true);
    const [firstTimeAppUsage, setFirstTimeAppUsage] = useState(true);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        content: null
    });
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (firstFetch) {
            setTimeout(() => {
                setFirstFetchState(false);
            }, 5000);
            return;
        }
        if ((prevNotificationAmount.current !== notifications.length) && prevNotificationAmount.current) {
            console.log(window.location.href);
            console.log(window.location.href.includes('authentication'));
            if (window.location.href.includes('authentication') ||
                window.location.href.includes('flowmeter-selection')) {
                return;
            }
            if (!window.location.href.includes('board')) {
                setUnreadNotificationsNumber(notifications.length - prevNotificationAmount.current);
            }
            setModalConfig({
                title: 'Otrzymałeś nowe powiadomienie!',
                content: (
                    <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', margin: '10px 0'}}>
                        <Button variant="contained" color="primary" onClick={() => {
                            closeModal();
                        }}>Ok!</Button>
                    </div>
                )
            });
            setModalState(true);
        }
        prevNotificationAmount.current = notifications.length;
    }, [notifications]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        setSpinnerState(true);
        axios.get('http://35.246.205.45:5000/notification')
            .then(
                response => {
                    setNotifications(response.data);
                }
            )
            .catch(
                () => {
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
            .finally(
                () => {
                    setSpinnerState(false);
                    setTimeout(() => {
                        fetchNotifications();
                    }, 10000)
                }
            )
    };

    const showMenu = () => {
        return !window.location.href.includes('authentication') && !window.location.href.includes('flowmeter-selection');
    };

    const closeModal = () => {
        setModalState(false);
    };

    return (
        <Wrapper app={(() => {
            return (
                <Router>
                    <Header notifications={unreadNotificationsNumber} isAuthenticated={isAuthenticated}></Header>
                    <Modal open={showModal} handleClose={() => {
                        closeModal();
                    }} modalTitle={modalConfig.title} modalContent={modalConfig.content}></Modal>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    isAuthenticated ?
                                        <Redirect to="/board"/> :
                                        <Redirect to="/authentication"/>
                                )
                            }}
                        />
                        <Route path="/authentication">
                            <Container className="content-container">
                                <Authentication setAuthenticationState={setAuthenticationState}
                                                firstTimeAppUsage={firstTimeAppUsage}
                                                setFirstTimeAppUsage={setFirstTimeAppUsage}/>
                            </Container>
                        </Route>
                        <Route path="/flowmeter-selection">
                            <Container className="content-container">
                                <FlowmeterSelection/>
                            </Container>
                        </Route>
                        <Route path="/authenticated">
                            <BottomNav setAuthenticationState={setAuthenticationState}></BottomNav>
                            <Route path="/authenticated/board">
                                <Container className="content-container">
                                    <NotificationBoard notifications={notifications} resetUnreadNotificationNumber={
                                        () => {
                                            setUnreadNotificationsNumber(0)
                                        }
                                    }/>
                                </Container>
                            </Route>
                            <Route path="/authenticated/profile">
                                <Container className="content-container">
                                    <UserProfile/>
                                </Container>
                            </Route>
                            <Route path="/authenticated/market">
                                <Container className="content-container">
                                    <Market/>
                                </Container>
                            </Route>
                        </Route>
                    </Switch>
                </Router>
            )
        })()}>
            {showSpinner ? <Spinner></Spinner> : null}
        </Wrapper>
    );
}

export default App;
