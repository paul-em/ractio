const WebSocket = require('ws');

const clients = {};
let wss;

function broadcast(self, payload) {
  wss.clients.forEach((client) => {
    if (client !== self && client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

module.exports = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    let name = '';
    ws.on('message', (data) => {
      let parsedMessage = null;
      try {
        parsedMessage = JSON.parse(data);
      } catch (e) {
        console.log('could not parse message', data);
      }
      if (parsedMessage.fn === 'join') {
        name = parsedMessage.payload;
        clients[parsedMessage.payload] = ws;
      }
      parsedMessage.from = name;

      if (parsedMessage.to === 'all') {
        broadcast(ws, JSON.stringify(parsedMessage));
      } else {
        const client = clients[parsedMessage.to];
        if (client && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      }
    });
    ws.on('close', () => {
      broadcast(ws, JSON.stringify({ fn: 'leave', payload: wss.clients.size }));
    });
  });
};
