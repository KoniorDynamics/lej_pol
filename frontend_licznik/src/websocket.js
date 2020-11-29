import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://35.246.205.45:5000/api_v1/water_meter');

const initiateWebsocketConnection = () => {
    socket.on('connected', () => {
        console.log('WebSocket Client Connected');
    });
    socket.on('event', (message) => {
        console.log(message);
    });
};

const sendMessage = (flow) => {

    console.log(flow, socket.connected)
    socket.emit('msg', flow);
};

export const websocket = {initiateWebsocketConnection, sendMessage};
