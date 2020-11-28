import React, {useState} from 'react';
import './App.css';
import Counter from "./components/counter/counter";
import Rotor from "./components/rotor/rotor.jsx";
import VolumeMeter from "./components/volume-meter/volume-meter";
import {websocket} from "./websocket";
import {flowProfiles} from "./flow-profiles";

function App() {

    websocket.initiateWebsocketConnection();

    const [isWaterFlowing, setWaterFlow] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [tapFlowInterval, setTapFlowInterval] = useState(0);
    const [totalWaterVolume, setTotalWaterVolume] = useState(3.345765);

    const handleWaterUse = (waterUsage, time) => {
        if (isWaterFlowing) {
            return;
        }
        let timeout;
        console.log(waterUsage, time);
        switch (waterUsage) {
            case 'washingMachine':
                timeout = 3000;
                break;
            case 'dishWashingMachine':
                timeout = 2000;
                break;
            case 'shower':
                timeout = 1000;
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
            if (change % 10 === 0) {
                websocket.sendMessage(flowProfiles.washingMachine(change*10));
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
            setTotalWaterVolume((parseFloat(totalWaterVolume) + change / 1000000).toFixed(6))
        }, 10));
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
