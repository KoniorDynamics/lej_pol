import io from 'socket.io-client';

const socket = io().connect('http://127.0.0.1:5000/api_v1/water_meter');

const initiateWebsocketConnection = () => {
    socket.on('connected', () => {
        console.log('WebSocket Client Connected');
    });
    socket.on('event', (message) => {
        console.log(message);
    });
};

const sendMessage = (flow) => {
    console.log(flow)
    socket.emit('message', flow);
};

export const websocket = {initiateWebsocketConnection, sendMessage};
