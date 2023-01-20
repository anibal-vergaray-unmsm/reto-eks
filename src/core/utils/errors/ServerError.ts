import { HttpStatus } from '@nestjs/common';
import { HttpError } from './HttpError';

export class ServerError extends HttpError {
  constructor(message: string | string[]) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
