import React, {useState, useEffect} from 'react';
import './flowmeter-selection.css';
import Card from "@material-ui/core/Card/Card";
import {useHistory} from 'react-router-dom';
import Spinner from "../../shared/spinner/spinner";

const FlowmeterSelection = () => {

    const history = useHistory();
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoadingState(false);
        }, 3000);
    }, []);

    const selectFlowmeter = () => {
        history.push('/board');
    };

    return (
        <>
            {loadingState ?
                <Spinner title={'Szukamy Twoich smart-liczników'}></Spinner>
                :
                <div className="flowmeter-selection-container">
                    <p className='flowmeter-title'>Wybierz smart-licznik:</p>
                    <Card className='card' onClick={selectFlowmeter}>
                        <p className="title">Flowmeter 1</p>
                        <p className="details">Bardzo dobry fest Flowmeter</p>
                    </Card>
                    <Card className='card' onClick={selectFlowmeter}>
                        <p className="title">Flowmeter 2</p>
                        <p className="details">Jeszcze lepszy flowmeter</p>
                    </Card>
                </div>
            }
        </>
    );
};

export default FlowmeterSelection;
