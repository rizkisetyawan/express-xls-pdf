require('dotenv').config();
const http = require('http');
const app = require('./app');
const logs = require('./lib/logs');
const terminus = require('./lib/terminus');

const server = http.createServer(app);

terminus(server);

server.listen(process.env.APP_PORT, () => {
  logs.info('Server up...');
  logs.info(`http://localhost:${process.env.APP_PORT}/`);
});
