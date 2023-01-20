import { Model } from 'mongoose';

export interface ServiceImpl<Class, Doc> {
  model: Model<Class>;

  findById?(id: string, verify?: boolean): Promise<Doc>;
}
