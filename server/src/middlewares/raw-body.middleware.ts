import { Injectable, NestMiddleware } from '@nestjs/common';
import { ServerResponse, IncomingMessage } from 'http';
import * as bodyParser from 'body-parser';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
    use(req: IncomingMessage, res: ServerResponse, next: () => any) {
        bodyParser.raw()(req, res, next);
    }
}
