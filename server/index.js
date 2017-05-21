const path = require('path');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails('mailto:paul3m@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

app.use(logger('dev'));
app.use(express.static(publicPath));

app.get('/api/available', (req, res) => {
  res.send(1);
});
app.get('/api/push-key', (req, res) => {
  res.send(vapidKeys.publicKey);
});
app.post('/api/push-register', bodyParser.json(), (req, res) => {
  if (!req.body || !req.body.endpoint) {
    res.status(400).send('no body');
  }
  setTimeout(() => {
    webpush.sendNotification(req.body, 'Test Payload');
  }, 30 * 1000);
  res.sendStatus(200);
});

app.use((req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
