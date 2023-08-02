const path = require('path');
const http = require('http');
const template = require('./../template').default;
const app = require('./expressConfig');
const config = require('../config/config');

const server = http.createServer(app);

server.listen(config.port);
console.log(`server run on ${config.port}`);