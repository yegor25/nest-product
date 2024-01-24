import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type UserRequestDocument = HydratedDocument<UserRequestInfo>

@Schema()
export class UserRequestInfo {
    _id: mongoose.Types.ObjectId;

    @Prop()
    IP: string;

    @Prop()
    URL: string;

    @Prop()
    date: Date
}


export type requestUserInfoType = {
    IP: string,
    URL: string,
    date: Date
}

export const UserRequestInfoSchema = SchemaFactory.createForClass(UserRequestInfo)
