import { DataSource } from "typeorm";
import { createSecurityDevicesDto, securityDevicesInputType, securityDevicesSqlDbType, securityDevicesViewType } from "./securityDevices.schema";
export declare class SecurityDevicesSqlRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    create(dto: createSecurityDevicesDto): Promise<any>;
    getSession(deviceId: string): Promise<securityDevicesViewType>;
    getAllSessions(userId: string): Promise<securityDevicesViewType[]>;
    checkUserSession(deviceId: string): Promise<securityDevicesSqlDbType>;
    checkSession(dto: securityDevicesInputType): Promise<string | null>;
    checkActiveSession(deviceId: string): Promise<boolean>;
    deleteDeviceSession(deviceId: string): Promise<boolean>;
    deactivateSession(deviceId: string): Promise<boolean>;
    changeActiveDate(deviceId: string): Promise<boolean>;
    deleteAllsessionBesideCurrent(deviceId: string, userId: string): Promise<boolean>;
    deleteAllData(): Promise<boolean>;
}
