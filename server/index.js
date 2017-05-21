const path = require('path');
const http = require('http');
const express = require('express');
const logger = require('morgan');

const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(logger('dev'));
app.use(express.static(publicPath));

app.use((req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
