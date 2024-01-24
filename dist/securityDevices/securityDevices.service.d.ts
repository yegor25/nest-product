import { SecurityDevicesRepository } from "./securityDevices.repository";
import { SecurityDevices, securityDevicesInputType, securityDevicesViewType } from "./securityDevices.schema";
export declare class SecurityDevicesService {
    protected securityDevicesRepository: SecurityDevicesRepository;
    constructor(securityDevicesRepository: SecurityDevicesRepository);
    create(dto: securityDevicesInputType): Promise<SecurityDevices>;
    getSession(deviceId: string): Promise<securityDevicesViewType | null>;
    getAllSessions(userId: string): Promise<securityDevicesViewType[] | null>;
    checkUserSession(deviceId: string): Promise<SecurityDevices | null>;
    checkSession(dto: securityDevicesInputType): Promise<string | null>;
    deleteDeviceSession(deviceId: string): Promise<boolean>;
    deactivateSession(deviceId: string): Promise<boolean>;
    changeActiveDate(deviceId: string): Promise<boolean>;
    deleteAllsessionBesideCurrent(deviceId: string, userId: string): Promise<boolean>;
}
