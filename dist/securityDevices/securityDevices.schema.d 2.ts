/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { HydratedDocument } from "mongoose";
export type SecurityDevicesDocument = HydratedDocument<SecurityDevices>;
export declare class SecurityDevices {
    _id: mongoose.Types.ObjectId;
    ip: string;
    url: string;
    title: string;
    deviceId: string;
    lastActiveDate: string;
    isActive: boolean;
    userId: string;
}
export type securityDevicesViewType = {
    ip: string;
    title: string;
    lastActiveDate: string;
    deviceId: string;
};
export type securityDevicesInputType = {
    title: string;
    userId: string;
    ip: string;
};
export type createSecurityDevicesDto = {
    ip: string;
    title: string;
    lastActiveDate: string;
    deviceId: string;
    isActive: boolean;
    userId: string;
};
export type securityDevicesSqlDbType = {
    id: string;
    ip: string;
    title: string;
    lastActiveDate: string;
    deviceId: string;
    isActive: boolean;
    userId: string;
};
export declare const SecurityDevicesSchema: mongoose.Schema<SecurityDevices, mongoose.Model<SecurityDevices, any, any, any, mongoose.Document<unknown, any, SecurityDevices> & SecurityDevices & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, SecurityDevices, mongoose.Document<unknown, {}, mongoose.FlatRecord<SecurityDevices>> & mongoose.FlatRecord<SecurityDevices> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
