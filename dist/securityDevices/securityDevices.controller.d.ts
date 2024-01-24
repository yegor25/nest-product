import { SecurityDevicesService } from "./securityDevices.service";
import { Request } from "express";
import { User } from "../users/user.schema";
export declare class SecurityDevicesController {
    protected securityDevicesService: SecurityDevicesService;
    constructor(securityDevicesService: SecurityDevicesService);
    getById(req: Request<{}, {}, {
        user: User;
    }, {}>): Promise<import("./securityDevices.schema").securityDevicesViewType[]>;
    deleteAllSessionsBesideCurrent(): Promise<void>;
}
