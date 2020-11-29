import React, {useState, useEffect} from 'react';
import './flowmeter-selection.css';
import Card from "@material-ui/core/Card/Card";
import {useHistory} from 'react-router-dom';
import Spinner from "../../shared/spinner/spinner";
import Button from "@material-ui/core/Button";

const FlowmeterSelection = () => {

    const history = useHistory();
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoadingState(false);
        }, 3000);
    }, []);

    const selectFlowmeter = () => {
        history.push('/authenticated/board');
    };

    return (
        <>
            {loadingState ?
                <Spinner title={'Szukamy Twoich smart-liczników'}></Spinner>
                :
                <div className="flowmeter-selection-container">
                    <p className='flowmeter-title'>Wybierz smart-licznik:</p>
                    <Card className='card'>
                        <p className="title">Flowmeter Turbo 5000</p>
                        <p className="details">Bardzo dobry fest Flowmeter</p>
                        <br/>
                        <Button variant="contained" color="primary" onClick={selectFlowmeter}>Wybierz</Button>
                    </Card>
                    <Card className='card'>
                        <p className="title">Flowmeter Spoko 500F8</p>
                        <p className="details">Jeszcze lepszy flowmeter</p>
                        <br/>
                        <Button variant="contained" color="primary" onClick={selectFlowmeter}>Wybierz</Button>
                    </Card>
                    <Card className='card'>
                        <p className="title">Flowmeter Spoko 500F12</p>
                        <p className="details">Flowmeter z podajnikiem kociej karmy</p>
                        <br/>
                        <Button variant="contained" color="primary" onClick={selectFlowmeter}>Wybierz</Button>
                    </Card>
                    <Card className='card'>
                        <p className="title">Flowmeter Tanialeujdzie s300</p>
                        <p className="details">Taki co go bym już nie używał</p>
                        <br/>
                        <Button variant="contained" color="primary" onClick={selectFlowmeter}>Wybierz</Button>
                    </Card>
                </div>
            }
        </>
    );
};

export default FlowmeterSelection;
