import React, {useState} from 'react';
import './App.css';
import Counter from "./components/counter/counter";
import Rotor from "./components/rotor/rotor.jsx";
import VolumeMeter from "./components/volume-meter/volume-meter";
import {flowProfiles} from "./flow-profiles";
import axios from 'axios';

function App() {

    const [isWaterFlowing, setWaterFlow] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [tapFlowInterval, setTapFlowInterval] = useState(0);
    const [totalWaterVolume, setTotalWaterVolume] = useState(3.345765);

    const handleWaterUse = (waterUsage, time) => {
        if (isWaterFlowing) {
            return;
        }
        let timeout;
        switch (waterUsage) {
            case 'washingMachine':
                timeout = 17000;
                break;
            case 'dishWashingMachine':
                timeout = 24000;
                break;
            case 'shower':
                timeout = 8000;
                break;
            case 'tap':
                timeout = time;
                break;
            default:
                timeout = 0;
        }
        setWaterFlow(true);
        let change = 0;
        const flowInterval = setInterval(() => {
            change += 1;
            setRotation(rotation + change);
            if (change % 100 === 0) {
                sendFlowData(JSON.stringify({time: Date.now(), flow: flowProfiles[waterUsage](change*10)}));
            }
            setTotalWaterVolume((parseFloat(totalWaterVolume) + change / 1000000).toFixed(6))
        }, 10);
        setTimeout(() => {
            setWaterFlow(false);
            clearInterval(flowInterval);
        }, timeout);
    };

    const openTap = () => {
        if (isWaterFlowing) {
            return;
        }
        setWaterFlow(true);
        let change = 0;
        setTapFlowInterval(setInterval(() => {
            change += 1;
            setRotation(rotation + change);
            if (change % 100 === 0) {
                sendFlowData(JSON.stringify({time: Date.now(), flow: flowProfiles.tap()}));
            }
            setTotalWaterVolume((parseFloat(totalWaterVolume) + change / 1000000).toFixed(6))
        }, 10));
    };

    const sendFlowData = (flowData) => {
        axios.post('http://127.0.0.1:5000/flow', flowData);
    };

    const closeTap = () => {
        setWaterFlow(false);
        clearInterval(tapFlowInterval);
    };

    return (
        <>
            <Counter handleWaterUse={(waterUsage) => {
                handleWaterUse(waterUsage)
            }} closeTap={() => {
                closeTap()
            }} openTap={() => {
                openTap()
            }}></Counter>
            <Rotor rotation={rotation}/>
            <VolumeMeter totalVolume={totalWaterVolume}/>
        </>
    );
}

export default App;
