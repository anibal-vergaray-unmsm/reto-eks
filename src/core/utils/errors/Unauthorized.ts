import { HttpStatus } from '@nestjs/common';
import { HttpError } from './HttpError';

export class Unauthorized extends HttpError {
  constructor(message: string | string[]) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
