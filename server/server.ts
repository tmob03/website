import "reflect-metadata";
import { startTypeORM } from "./config/typeorm";
import * as http from "http"
import * as express from "express";
import { config } from "./config/config";

const app = express();	
let server: http.Server;

require('./config/express')(app, config);

startTypeORM().then(() => {

	server = http.createServer(app);
	server.listen(config.port, '0.0.0.0');
});


export default server;
