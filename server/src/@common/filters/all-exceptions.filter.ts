import { Catch, ArgumentsHost, HttpStatus, Logger, UnauthorizedException, HttpException } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(protected readonly httpAdapterHost: HttpAdapterHost) {
        super();
    }

    catch(exception: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        // this should catch all the inheritors of HttpException as well
        if (exception instanceof HttpException) {
            super.catch(exception, host);
            return;
        }

        const errorCode = AllExceptionsFilter.GenerateErrorCode();

        const responseBody = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            // Don't send database-related errors
            message: exception instanceof PrismaClientKnownRequestError ? 'Database Error' : exception.message,
            errorCode: errorCode
        };

        Logger.error(
            `Error - Code [${errorCode}]\n` +
                `Exception: ${JSON.stringify(exception)}\n` +
                `Message: ${exception.message}\n` +
                `Stack: ${exception.stack}`
        );

        httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private static GenerateErrorCode(): string {
        return Math.random().toString(36).slice(2).toUpperCase();
    }
}
