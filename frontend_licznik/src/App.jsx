import React, {useState} from 'react';
import './App.css';
import Counter from "./components/views/counter/counter";
import Rotor from "./components/shared/rotor/rotor.jsx";

function App() {

    const [isWaterFlowing, setWaterFlow] = useState(false);
    const [rotation, setRotation] = useState(0);

    const handleWaterUse = (waterUsage, time) => {
        if (isWaterFlowing) {
            return;
        }
        let timeout;
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
        }
        setWaterFlow(true);
        let initialRotationChange = 0;
        const rotationInterval = setInterval((i) => {
            initialRotationChange += 1;
            setRotation(rotation + initialRotationChange);
        }, 10);
        setTimeout(() => {
            setWaterFlow(false);
            clearInterval(rotationInterval);
        }, timeout);
    };

    return (
        <>
            <Counter handleWaterUse={handleWaterUse}></Counter>
            <Rotor rotation={rotation}/>
        </>
    );
}

export default App;
