import { DataSource, Repository } from "typeorm";
import { createSecurityDevicesDto, securityDevicesInputType, securityDevicesViewType } from "./securityDevices.schema";
import { SecurityDevices } from "./securityDevices.entity";
export declare class SecurityDevicesSqlRepository {
    protected dataSource: DataSource;
    protected secDevRepository: Repository<SecurityDevices>;
    constructor(dataSource: DataSource, secDevRepository: Repository<SecurityDevices>);
    create(dto: createSecurityDevicesDto): Promise<any>;
    getSession(deviceId: string): Promise<securityDevicesViewType>;
    getAllSessions(userId: string): Promise<securityDevicesViewType[]>;
    checkUserSession(deviceId: string): Promise<SecurityDevices | null>;
    checkSession(dto: securityDevicesInputType): Promise<string | null>;
    checkActiveSession(deviceId: string): Promise<boolean>;
    deleteDeviceSession(deviceId: string): Promise<boolean>;
    deactivateSession(deviceId: string): Promise<boolean>;
    changeActiveDate(deviceId: string): Promise<boolean>;
    deleteAllsessionBesideCurrent(deviceId: string, userId: string): Promise<boolean>;
    deleteAllData(): Promise<boolean>;
}
