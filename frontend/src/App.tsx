import React from 'react';
import './App.css';
import Wrapper from "./components/web-wrapper/web-wrapper";
import Button from "@material-ui/core/Button";

function App() {
    return (
        <Wrapper app={(() => {
            return (
                <>
                    <div>Fajnie fest</div>
                    <Button variant='contained' color='primary'>Spoko button</Button>
                </>
            )
        })()}></Wrapper>
    );
}

export default App;
