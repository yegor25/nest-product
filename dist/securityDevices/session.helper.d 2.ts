import { SecurityDevices, createSecurityDevicesDto, securityDevicesInputType, securityDevicesViewType } from "./securityDevices.schema";
export declare const sessionsHelper: {
    sessionMapperForDb(data: securityDevicesInputType): createSecurityDevicesDto;
    sessionViewMapper(data: SecurityDevices): securityDevicesViewType;
    sesionsViewMapperArray(data: SecurityDevices[]): securityDevicesViewType[];
};
