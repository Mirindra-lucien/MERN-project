const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

const template = require('./../template').default;
const app = require('./expressConfig');
const config = require('../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);
mongoose.connection.on("error", () => {
    throw new Error(`cannot connect to ${config.mongoURI}`);
});

const server = http.createServer(app);
server.listen(config.port);
console.log(`server run on ${config.port}`);