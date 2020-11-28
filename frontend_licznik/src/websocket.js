import io from 'socket.io-client';

const socket = io().connect('http://127.0.0.1:5000');

const initiateWebsocketConnection = () => {
    socket.on('open', () => {
        console.log('WebSocket Client Connected');
    });
    socket.on('event', (message) => {
        console.log(message);
    });
};

const sendMessage = (flow) => {
    socket.emit('message', flow);
};

export const websocket = {initiateWebsocketConnection, sendMessage};
