import * as dotenv from 'dotenv';
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { TransformInterceptor } from 'src/core/interceptors/TransformInterceptor';
import { ErrorsInterceptor } from 'src/core/interceptors/ErrorsInterceptor';

export const testModule = Test.createTestingModule({ imports:[AppModule] });

export const config = (app) => {
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    forbidUnknownValues: true,
  }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ErrorsInterceptor(httpAdapterHost));
}