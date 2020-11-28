import React from 'react';
import './App.css';
import Wrapper from "./components/web-wrapper/web-wrapper";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from "./components/views/home/home";
import BottomNav from './components/shared/bottom-nav/bottom-nav'
import NotificationBoard from "./components/views/notification-board/notification-board";
import Container from "@material-ui/core/Container";

function App() {

    return (
        <Wrapper app={(() => {
            return (
                <Router>
                    <Container className="content-container">
                        <Switch>
                            <Route path="/home">
                                <Home/>
                            </Route>
                            <Route path="/board">
                                <NotificationBoard/>
                            </Route>
                        </Switch>
                    </Container>
                    <BottomNav></BottomNav>
                </Router>
            )
        })()}></Wrapper>
    );
}

export default App;
