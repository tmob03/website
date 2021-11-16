import { Connection, createConnection } from "typeorm";
import { config } from './config';

export function startTypeORM(): Promise<Connection> {
    return createConnection(config.db);
}
