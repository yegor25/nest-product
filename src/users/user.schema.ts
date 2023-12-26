import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  login: string;

  @Prop()
  email: string;

  @Prop({
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Prop()
  hashPassword: string;

  @Prop()
  passwordSalt: string;

  //   @Prop()
  //   emailConfirmation: {
  //     code: string;
  //     isConfirmed: boolean;
  //     expirationDate: Date;
  //   };
}

export const UserSchema = SchemaFactory.createForClass(User);
