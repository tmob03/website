import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ServerResponse, IncomingMessage } from 'http';

@Injectable()
export class HTTPLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: IncomingMessage, response: ServerResponse, next: () => any): void {
        const { method, url } = request;
        const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress || '';
        const userAgent = request.headers['user-agent'] || '';

        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.getHeader('content-length');

            this.logger.log(`${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
        });

        next();
    }
}
