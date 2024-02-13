import { SecurityDevicesService } from "./securityDevices.service";
import { Request } from "express";
import { userSqlDbType } from "../users/user.schema";
export declare class SecurityDevicesController {
    protected securityDevicesService: SecurityDevicesService;
    constructor(securityDevicesService: SecurityDevicesService);
    getById(req: Request<{}, {}, {
        user: userSqlDbType;
    }, {}>): Promise<import("./securityDevices.schema").securityDevicesViewType[]>;
    deleteDeviceById(deviceId: string, data: {
        user: userSqlDbType;
    }): Promise<void>;
    deleteAllSessionsBesideCurrent(req: Request<{}, {}, {
        user: userSqlDbType;
        deviceId: string;
    }, {}>): Promise<void>;
}
