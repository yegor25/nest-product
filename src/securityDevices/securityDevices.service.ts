import { Injectable } from "@nestjs/common";
import { SecurityDevicesRepository } from "./securityDevices.repository";
import { SecurityDevices, createSecurityDevicesDto, securityDevicesInputType, securityDevicesViewType } from "./securityDevices.schema";
import { sessionsHelper } from "./session.helper";



@Injectable()
export class SecurityDevicesService { 
    constructor(
        protected securityDevicesRepository:SecurityDevicesRepository
    ){}

    async create(dto: securityDevicesInputType):Promise<SecurityDevices>{
        const data:createSecurityDevicesDto  = sessionsHelper.sessionMapperForDb(dto)
        return this.securityDevicesRepository.create(data) 
    }
    async getSession(deviceId: string):Promise<securityDevicesViewType | null>{
        return this.securityDevicesRepository.getSession(deviceId)
    }
    async getAllSessions(userId: string):Promise<securityDevicesViewType[] | null>{
        return this.securityDevicesRepository.getAllSessions(userId)
    }
    async checkUserSession(deviceId: string):Promise<SecurityDevices | null>{
        return this.securityDevicesRepository.checkUserSession(deviceId)
    }
    async checkSession(dto:securityDevicesInputType):Promise<string | null>{
        return this.securityDevicesRepository.checkSession(dto)
    }
    async deleteDeviceSession(deviceId: string):Promise<boolean>{
        return this.securityDevicesRepository.deleteDeviceSession(deviceId)
       
    }
    async deactivateSession(deviceId: string):Promise<boolean>{
        return this.securityDevicesRepository.deactivateSession(deviceId )
    }
    async changeActiveDate(deviceId: string):Promise<boolean>{
        return this.securityDevicesRepository.changeActiveDate(deviceId )
    }
    async deleteAllsessionBesideCurrent(deviceId: string, userId: string):Promise<boolean>{
        return this.securityDevicesRepository.deleteAllsessionBesideCurrent(deviceId,userId)
    }
}