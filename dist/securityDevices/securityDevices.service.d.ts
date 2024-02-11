import { SecurityDevicesRepository } from "./securityDevices.repository";
import { SecurityDevices, securityDevicesInputType, securityDevicesSqlDbType, securityDevicesViewType } from "./securityDevices.schema";
import { SecurityDevicesSqlRepository } from "./securityDevicesSql.repository";
export declare class SecurityDevicesService {
    protected securityDevicesRepository: SecurityDevicesRepository;
    protected secutityDevicesSqlRepository: SecurityDevicesSqlRepository;
    constructor(securityDevicesRepository: SecurityDevicesRepository, secutityDevicesSqlRepository: SecurityDevicesSqlRepository);
    create(dto: securityDevicesInputType): Promise<SecurityDevices>;
    getSession(deviceId: string): Promise<securityDevicesViewType | null>;
    getAllSessions(userId: string): Promise<securityDevicesViewType[] | null>;
    checkUserSession(deviceId: string): Promise<securityDevicesSqlDbType | null>;
    checkSession(dto: securityDevicesInputType): Promise<string | null>;
    deleteDeviceSession(deviceId: string): Promise<boolean>;
    deactivateSession(deviceId: string): Promise<boolean>;
    changeActiveDate(deviceId: string): Promise<boolean>;
    deleteAllsessionBesideCurrent(deviceId: string, userId: string): Promise<boolean>;
}
