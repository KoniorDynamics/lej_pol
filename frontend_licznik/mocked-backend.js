const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer(function (request, response) {
});

const config = {
    port: 5000
};

server.listen(config.port, console.log(`server listening on port: ${config.port}`));

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', request => {
    const connection = request.accept(null, request.origin);

    connection.on('message', message => {
        if (message.type === 'utf8') {
            console.log(message.utf8Data);
        }
    });

    connection.on('close', (connectionNumber, connectionReason) => {
        console.log(`${connectionNumber} closed because: ${connectionReason}`)
    });
});
