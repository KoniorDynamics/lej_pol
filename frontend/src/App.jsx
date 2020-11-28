import React, {useState, useEffect} from 'react';
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

function App() {

    const [isAuthenticated, setAuthenticationState] = useState(false);
    const [unreadNotificationsNumber, setUnreadNotificationsNumber] = useState(0);
    const [showModal, setModalState] = useState(false);
    const [firstFetch, setFirstFetchState] = useState(true);
    const [modalConfig, setModalConfig] = useState({
        title: 'Elo elo 3 2 0',
        content: (<p>Fantastyczny modal</p>)
    });
    const [notifications, setNotifications] = useState([
        {
            timestamp: Date.now() - 3600000,
            type: 'activityStart',
            title: 'Włączyłeś pralkę!'
        },
        {
            timestamp: Date.now() - 2700000,
            type: 'activityFinished',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }, {
            timestamp: Date.now() - 36000000,
            type: 'activityStart',
            title: 'Włączyłeś pralkę!'
        },
        {
            timestamp: Date.now() - 27000000,
            type: 'activityFinished',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }, {
            timestamp: Date.now() - 360000000,
            type: 'activityStart',
            title: 'Włączyłeś pralkę!'
        },
        {
            timestamp: Date.now() - 270000000,
            type: 'activityFinished',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }
    ]);

    useEffect(() => {
        if (firstFetch) {
            setFirstFetchState(false);
            return;
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
    }, [notifications]);

    useEffect(() => {
        setTimeout(() => {
            const newNotification = {
                timestamp: Date.now() - 50,
                type: 'stats',
                title: 'Zobacz swoje zużycie wody w tym tygodniu:',
                data: [
                    ['Data', 'Zużycie wody'],
                    ['21.11', 0.12],
                    ['22.11', 0.12],
                    ['23.11', 0.16],
                    ['24.11', 0.09],
                    ['25.11', 0.07],
                    ['26.11', 0.19],
                    ['27.11', 0.18],
                ]
            };
            if (!window.location.href.includes('board')) {
                setUnreadNotificationsNumber(1);
            }
            setNotifications([...notifications, newNotification]);
        }, 4000)
    }, []);

    const showMenu = () => {
        return !window.location.href.includes('authenticate') && !window.location.href.includes('flowmeter-selection');
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
                    <Container className="content-container">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => {
                                    return (
                                        isAuthenticated ?
                                            <Redirect to="/board"/> :
                                            <Redirect to="/authenticate"/>
                                    )
                                }}
                            />
                            <Route path="/authenticate">
                                <Authentication setAuthenticationState={setAuthenticationState}/>
                            </Route>
                            <Route path="/flowmeter-selection">
                                <FlowmeterSelection/>
                            </Route>
                            <Route path="/board">
                                <NotificationBoard notifications={notifications} resetUnreadNotificationNumber={
                                    () => {
                                        setUnreadNotificationsNumber(0)
                                    }
                                }/>
                            </Route>
                            <Route path="/profile">
                                <UserProfile/>
                            </Route>
                            <Route path="/market">
                                <Market/>
                            </Route>
                        </Switch>
                    </Container>
                    {showMenu() ?
                        <BottomNav setAuthenticationState={setAuthenticationState}></BottomNav>
                        :
                        null}
                </Router>
            )
        })()}></Wrapper>
    );
}

export default App;
