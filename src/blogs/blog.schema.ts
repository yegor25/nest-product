



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Prop()
  websiteUrl: string;

  @Prop({
    default: false
  })
  isMembership: boolean;

  
}

export type blogItemsResponseType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type createdDtoBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}
// export type responseDtoBlogType = paginatorType & {
//     items: blogItemsResponseType[]
// }

export const BlogSchema = SchemaFactory.createForClass(Blog)