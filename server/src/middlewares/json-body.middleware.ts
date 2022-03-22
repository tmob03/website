import { ServerResponse, IncomingMessage } from 'http';
import * as bodyParser from 'body-parser';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
    use(req: IncomingMessage, res: ServerResponse, next: () => any) {
        bodyParser.json()(req, res, next);
    }
}
