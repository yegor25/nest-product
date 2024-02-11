import { Injectable } from "@nestjs/common";
import { SecurityDevicesRepository } from "./securityDevices.repository";
import { SecurityDevices, createSecurityDevicesDto, securityDevicesInputType, securityDevicesSqlDbType, securityDevicesViewType } from "./securityDevices.schema";
import { sessionsHelper } from "./session.helper";
import { SecurityDevicesSqlRepository } from "./securityDevicesSql.repository";



@Injectable()
export class SecurityDevicesService { 
    constructor(
        protected securityDevicesRepository:SecurityDevicesRepository,
        protected secutityDevicesSqlRepository: SecurityDevicesSqlRepository
    ){}

    async create(dto: securityDevicesInputType):Promise<SecurityDevices>{
        const data:createSecurityDevicesDto  = sessionsHelper.sessionMapperForDb(dto)
        return this.secutityDevicesSqlRepository.create(data) 
    }
    async getSession(deviceId: string):Promise<securityDevicesViewType | null>{
        return this.secutityDevicesSqlRepository.getSession(deviceId)
    }
    async getAllSessions(userId: string):Promise<securityDevicesViewType[] | null>{
        return this.secutityDevicesSqlRepository.getAllSessions(userId)
    }
    async checkUserSession(deviceId: string):Promise<securityDevicesSqlDbType | null>{
        return this.secutityDevicesSqlRepository.checkUserSession(deviceId)
    }
    async checkSession(dto:securityDevicesInputType):Promise<string | null>{
        return this.secutityDevicesSqlRepository.checkSession(dto)
    }
    async deleteDeviceSession(deviceId: string):Promise<boolean>{
        return this.secutityDevicesSqlRepository.deleteDeviceSession(deviceId)
       
    }
    async deactivateSession(deviceId: string):Promise<boolean>{
        return this.secutityDevicesSqlRepository.deactivateSession(deviceId )
    }
    async changeActiveDate(deviceId: string):Promise<boolean>{
        return this.secutityDevicesSqlRepository.changeActiveDate(deviceId )
    }
    async deleteAllsessionBesideCurrent(deviceId: string, userId: string):Promise<boolean>{
        return this.secutityDevicesSqlRepository.deleteAllsessionBesideCurrent(deviceId,userId)
    }
}