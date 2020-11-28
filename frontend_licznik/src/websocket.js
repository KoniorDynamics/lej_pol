import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:5000');

const initiateWebsocketConnection = () => {
    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
        console.log(message);
    };
};

const sendMessage = (flow) => {
    client.send(flow);
};

export const websocket = {initiateWebsocketConnection, sendMessage};
