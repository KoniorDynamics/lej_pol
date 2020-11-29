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
    const [firstTimeAppUsage, setFirstTimeAppUsage] = useState(true);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        content: null
    });
    const [notifications, setNotifications] = useState([
        {
            timestamp: Date.now() - 36007,
            type: 'standard',
            title: 'Włączyłeś pralkę!'
        },
        {
            "details": "Jeszcze się uczę! Podpowiedz mi co teraz robiłeś?",
            "options": [
                "dishwasher + tap",
                "shower + dishwasher"
            ],
            "timestamp": 1606609832620,
            "title": "A co to?",
            "type": "decision"
        },
        {
            timestamp: Date.now() - 36,
            type: 'badge',
            title: 'Zdobyłeś odznakę!',
            badge: 'szklanka'
        },
        {
            timestamp: Date.now() - 27000000,
            type: 'badge',
            title: 'Zdobyłeś odznakę!',
            badge: 'drzewko'
        },
        {
            timestamp: Date.now() - 36000,
            type: 'marketplace',
            title: 'Obczaj ten nowy bajer w marketplace!',
            photoUrl: 'https://dentaltree.pl/userdata/public/gfx/c85682bbc4eb215b778463eb85d7b71c.jpg'
        },
        {
            timestamp: Date.now() - 27007,
            type: 'standard',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }, {
            timestamp: Date.now() - 36000000,
            type: 'standard',
            title: 'Włączyłeś pralkę!'
        },
        {
            timestamp: Date.now() - 27000000,
            type: 'standard',
            title: 'Pranie się skończyło!',
            details: 'Twoje pranie trwało 15 minut i kosztowało Cię 70 gr!'
        }, {
            timestamp: Date.now() - 360000000,
            type: 'standard',
            title: 'Włączyłeś pralkę!'
        },
        {
            timestamp: Date.now() - 270000000,
            type: 'standard',
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
        let i = 0;
        setTimeout(() => {
            i++;
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
                setUnreadNotificationsNumber(unreadNotificationsNumber + i);
            }
            setNotifications([...notifications, newNotification]);
        }, 13000)

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
        })()}></Wrapper>
    );
}

export default App;
