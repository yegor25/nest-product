import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type tokenType = HydratedDocument<Tokens>


@Schema()
export class Tokens {
    _id: mongoose.Types.ObjectId;

    @Prop()
    token: string

    @Prop()
    userId: string
}


export const TokenSchema = SchemaFactory.createForClass(Tokens)