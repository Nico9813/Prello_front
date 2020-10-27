const webSocketServer = require('websocket').server;
const http = require('http');
const webSocketsServerPort = 8000;

const server = http.createServer();
server.listen(webSocketsServerPort);

const wsServer = new webSocketServer({
    httpServer: server
});

const NUEVA_CONEXION = 'NUEVA_CONEXION'

var tableros = {}

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    const userID = getUniqueID();
    const connection = request.accept(null, request.origin);

    connection.on('message', function (message) {
        const mensaje = JSON.parse(message.utf8Data);
        const { type, payload } = mensaje
        const { tablero_id } = mensaje.payload

        //console.log("[Mensaje recibido] - %s ( %s )", type, JSON.stringify(payload))
        
        if (mensaje.type == NUEVA_CONEXION){
            tableros[tablero_id] = tableros[tablero_id] ? [...tableros[tablero_id], connection] : [connection]
        }else{
            broadcastMessage(tablero_id, mensaje, connection);
        }
    });
});

const broadcastMessage = (tablero_id, mensaje, origen) => {
    const mensaje_json = JSON.stringify(mensaje)
    tableros[tablero_id].map((client) => {
        if(client != origen) client.send(mensaje_json);
    });
}