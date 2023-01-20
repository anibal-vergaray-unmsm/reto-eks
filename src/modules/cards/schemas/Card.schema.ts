import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Ids from 'src/core/utils/ids';

export type CardDocument = Card & Document;

@Schema({
  versionKey: false,
})

export class Card {
  @Prop({ default: () => Ids.generate() })
    _id: string;

  @Prop({ type: String, required: true })
    token: string;

  @Prop({ type: Number, required: true })
    card_number: Number;

  @Prop({ type: Number, required: true })
    cvv: Number;

  @Prop({ type: String, required: true })
    expiration_month: string;

  @Prop({ type: String, required: true })
    expiration_year: string;

  @Prop({ type: String, required: true })
    email: string;

  @Prop({ type: Date, expires: '1m', default: Date.now})
    created_at: Date;
}

export const CardSchema = SchemaFactory.createForClass<Card, CardDocument>(Card);
