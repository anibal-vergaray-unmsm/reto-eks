import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './modules/cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          uri: config.get<string>(process.env.NODE_ENV === 'test' ? 'TEST_DB_CONNECTION': 'DB_CONNECTION')
      }),
    }),
    CardsModule
  ],
})
export class AppModule {}
