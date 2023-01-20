import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCardDTO } from './dtos/create-card.dto';
import { Card, CardDocument } from './schemas/Card.schema';
import { ServiceImpl } from 'src/core/utils/types/ServiceImpl';

@Injectable()
export class CardsService implements ServiceImpl<Card, CardDocument>{
  constructor(
    @InjectModel(Card.name) public model: Model<CardDocument>,
  ) {}

  async create(data: CreateCardDTO, token: string): Promise<{token: string}> {
    const card = await this.model.create({...data,token});
    return { token };
  }
  
  async getByToken(token: string): Promise<Card> {
    const card = await this.model.findOne({token},{cvv: 0});
    const response = card.toObject<Card>();

    return response;
  }

}
