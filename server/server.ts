const express = require('express'),
	http = require('http'),
	app = express();

require('./config/express')(app, config);

const server = http.createServer(app);
server.listen(config.port, '0.0.0.0');

module.exports = server;
