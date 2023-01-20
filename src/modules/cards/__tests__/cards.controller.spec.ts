import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { CardsController } from '../cards.controller';
import { TokenExpiredError } from 'jsonwebtoken';
import { CardsModule } from '../cards.module';
import { CardsService } from '../cards.service';
import { Card } from '../schemas/Card.schema';
import { NotFound } from 'src/core/utils/errors/NotFound';

describe('CardsController', () => {
  let cardsController: CardsController;
  let cardsService: CardsService;
  let jwtService: JwtService;
  const testToken = {token: 'tokenDePrueba'};
  const bodyToCreateCard = {
      "card_number": "4787076522158584",
      "cvv": "123",
      "expiration_month": "12",
      "expiration_year": "2025",
      "email": "anibal_dj@gmail.com"
  };
  const card = {
    "_id" : "123456789",
    "card_number": 4787076522158584,
    "cvv": 123,
    "expiration_month": "12",
    "expiration_year": "2025",
    "token": "tokenDePrueba",
    "created_at": new Date(),
    "email": "anibal_dj@gmail.com"
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [CardsModule],
      })
      .overrideProvider(getModelToken(Card.name))
      .useValue(jest.fn())
      .compile();

      cardsService = moduleRef.get<CardsService>(CardsService);
      jwtService = moduleRef.get<JwtService>(JwtService);
      cardsController = moduleRef.get<CardsController>(CardsController);
  });

  describe('create', () => {
    it('should return a token', async () => {

      jest.spyOn(cardsService, 'create').mockImplementation(async () => testToken);
      jest.spyOn(jwtService, 'sign').mockImplementation(() => testToken.token);

      const response = await cardsController.create(bodyToCreateCard);

      expect(response).toBe(testToken);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(cardsService.create).toHaveBeenCalledTimes(1);
    });
  });
  describe('getByToken', () => {
    it('get a card by token', async () => {

      jest.spyOn(cardsService, 'getByToken').mockImplementation(async () => card);
      jest.spyOn(jwtService, 'verify').mockImplementation(() => ({}));

      const response = await cardsController.getByToken(testToken.token);

      expect(response).toBe(card);
      expect(response.token).toBe(testToken.token);
      expect(jwtService.verify).toHaveBeenCalledTimes(1);
      expect(cardsService.getByToken).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {throw new TokenExpiredError('',new Date())});
      jest.spyOn(cardsService, 'getByToken').mockImplementation(async () => card);


      expect(async () => await cardsController.getByToken(testToken.token)).rejects.toThrow(NotFound);
      expect(async () => await cardsController.getByToken(testToken.token)).rejects.toThrow('Expired token.');

    });
  });
});