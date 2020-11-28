import React from 'react';
import './flowmeter-selection.css';
import Card from "@material-ui/core/Card/Card";
import { useHistory } from 'react-router-dom';

const FlowmeterSelection = () => {

    const history = useHistory();

    const selectFlowmeter = () => {
        history.push('/board');
    };

    return (
        <div className="flowmeter-selection-container">
            <p className='flowmeter-title'>Wykryte liczniki:</p>
            <Card className='card' onClick={selectFlowmeter}>
                <p className="title">Flowmeter 1</p>
                <p className="details">Bardzo dobry fest Flowmeter</p>
            </Card>
            <Card className='card' onClick={selectFlowmeter}>
                <p className="title">Flowmeter 2</p>
                <p className="details">Jeszcze lepszy flowmeter</p>
            </Card>
        </div>
    );
};

export default FlowmeterSelection;
