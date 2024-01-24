import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"


export type SecurityDevicesDocument = HydratedDocument<SecurityDevices>

@Schema()
export class SecurityDevices {
    _id: mongoose.Types.ObjectId;

    @Prop()
    ip: string;

    @Prop()
    url: string;

    @Prop()
    title: string

    @Prop()
    deviceId: string

    @Prop()
    lastActiveDate: string;

    @Prop()
    isActive: boolean

    @Prop()
    userId: string
}

export type securityDevicesViewType = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string
}

export type securityDevicesInputType = {
        title: string,
        userId:string,
        ip:string,
}
export type createSecurityDevicesDto = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string,
    isActive: boolean,
    userId: string,
}
export const SecurityDevicesSchema = SchemaFactory.createForClass(SecurityDevices)
