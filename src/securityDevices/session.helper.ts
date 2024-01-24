import { v4 } from "uuid"
import { SecurityDevices, createSecurityDevicesDto, securityDevicesInputType, securityDevicesViewType } from "./securityDevices.schema"


export const sessionsHelper = {
    sessionMapperForDb(data: securityDevicesInputType):createSecurityDevicesDto {
        const {ip,title, userId} = data
        const res:createSecurityDevicesDto = {
            title,
            userId,
            ip,
            deviceId: v4(),
            lastActiveDate: new Date().toISOString(),
            isActive: true
        }
        return res
    },
    sessionViewMapper(data: SecurityDevices):securityDevicesViewType {
        const {ip, title, lastActiveDate, deviceId} = data
        const res:securityDevicesViewType = {
            ip,
            title,
            lastActiveDate,
            deviceId
        }
        return res
    },
    sesionsViewMapperArray(data: SecurityDevices[]):securityDevicesViewType[]{
        return data.map(el => this.sessionViewMapper(el))
    }
}