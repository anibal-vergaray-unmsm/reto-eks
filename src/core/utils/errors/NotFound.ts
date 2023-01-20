import { HttpStatus } from '@nestjs/common';

import { HttpError } from './HttpError';

export class NotFound extends HttpError {
  constructor(message: string | string[]) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
