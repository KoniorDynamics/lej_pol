import React from 'react';
import './App.css';
import Wrapper from "./components/web-wrapper/web-wrapper";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from "./components/views/home/home";
import Placeholder from "./components/views/placeholder/placeholder";
import BottomNav from './components/shared/bottom-nav/bottom-nav'

function App() {

    return (
        <Wrapper app={(() => {
            return (
                <Router>
                    <div>Fajnie fest</div>
                    <BottomNav></BottomNav>
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/placeholder">
                            <Placeholder />
                        </Route>
                    </Switch>
                </Router>
            )
        })()}></Wrapper>
    );
}

export default App;
