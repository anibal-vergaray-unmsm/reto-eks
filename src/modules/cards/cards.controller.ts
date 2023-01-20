import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CardsService } from './cards.service';
import { CreateCardDTO } from './dtos/create-card.dto';
import { TokenExpiredError } from 'jsonwebtoken';
import { ServerError } from 'src/core/utils/errors/ServerError';
import { NotFound } from 'src/core/utils/errors/NotFound';
import { AuthGuard } from 'src/core/decorators/guards/auth.guard';

@Controller('tokens')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private jwtService: JwtService,
  ) {}

  @Post('')
  async create(
    @Body() body: CreateCardDTO
  ) {
    const token = this.jwtService.sign(body);
    return this.cardsService.create(body, token);
  }

  @Get(':token')
  async getByToken(
    @Param('token') token: string,
  ) {

    try {
      this.jwtService.verify(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new NotFound('Expired token.');
      }
      throw new ServerError(error?.message || 'Unknown error');
    }

    return this.cardsService.getByToken(token);
  }
}
