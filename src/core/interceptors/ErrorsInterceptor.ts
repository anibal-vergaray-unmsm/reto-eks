import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpError } from '../utils/errors/HttpError';

@Catch()
export class ErrorsInterceptor implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let responseBody: any;

    if (exception instanceof HttpError) {
      const status = exception.getStatus();

      responseBody = {
        statusCode: {
          http: status.http,
        },
        message: exception instanceof HttpError ? exception.getResponse() : 'Internal Server Error',
      };
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      let message = exception.getResponse();

      if (typeof message !== 'string') {
        message = (exception.getResponse() as any).message;
      }

      responseBody = {
        statusCode: {
          http: status,
        },
        message: message,
      };
    } else {
      console.error(exception);
      responseBody = {
        statusCode: { http: HttpStatus.INTERNAL_SERVER_ERROR },
        message: 'Internal Server Error',
      };
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode.http);
  }
}
