import React, {useState} from 'react';
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

function App() {

    const [isAuthenticated, setAuthenticationState] = useState(false);

    return (
        <Wrapper app={(() => {
            return (
                <Router>
                    <Header></Header>
                    <Container className="content-container">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => {
                                    return (
                                        isAuthenticated ?
                                            <Redirect to="/board" /> :
                                            <Redirect to="/authenticate" />
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
                                <NotificationBoard/>
                            </Route>
                            <Route path="/profile">
                                <UserProfile/>
                            </Route>
                            <Route path="/market">
                                <Market/>
                            </Route>
                        </Switch>
                    </Container>
                    {isAuthenticated && <BottomNav setAuthenticationState={setAuthenticationState}></BottomNav>}
                </Router>
            )
        })()}></Wrapper>
    );
}

export default App;
