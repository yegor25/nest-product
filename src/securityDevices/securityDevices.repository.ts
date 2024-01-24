import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SecurityDevices, createSecurityDevicesDto, securityDevicesInputType, securityDevicesViewType } from "./securityDevices.schema";
import { Model } from "mongoose";
import { sessionsHelper } from "./session.helper";



@Injectable()
export class SecurityDevicesRepository {
    constructor(
        @InjectModel(SecurityDevices.name) private securityDevicesModel:Model<SecurityDevices>
    ){}

    async create(dto:createSecurityDevicesDto){
        const newSes = new this.securityDevicesModel(dto)
        await newSes.save()
        return newSes
    }
    async getSession(deviceId: string):Promise<securityDevicesViewType | null>{
        const res = await this.securityDevicesModel.findOne({deviceId: deviceId})
       if(res) return sessionsHelper.sessionViewMapper(res)
       return null
    }
    async getAllSessions(userId: string):Promise<securityDevicesViewType[] | null> {
        const res = await this.securityDevicesModel.find({userId: userId, isActive: true}).lean()
        if(!res) return null
        return sessionsHelper.sesionsViewMapperArray(res)
    }
    async checkUserSession(deviceId: string):Promise<SecurityDevices | null>{
        const res = await this.securityDevicesModel.findOne({deviceId: deviceId})
        return res
    }
    async checkSession(data: securityDevicesInputType):Promise<string | null>{
        const res = await this.securityDevicesModel.findOne({userId: data.userId, title:data.title, ip: data.ip})
        if(!res) return null
        return res.deviceId
    }

    
    async deleteDeviceSession(deviceId: string):Promise<boolean>{
        const res = await this.securityDevicesModel.deleteOne({deviceId: deviceId})
        return res.deletedCount === 1
    }
    async deactivateSession(deviceId: string):Promise<boolean>{
        const res = await this.securityDevicesModel.updateOne(
            {deviceId: deviceId},
            {$set: {isActive: false}}
        )
        return res.modifiedCount === 1
    }
    async changeActiveDate(deviceId: string):Promise<boolean>{
        const res = await this.securityDevicesModel.updateOne(
            {deviceId: deviceId},
            {$set: {lastActiveDate: new Date().toISOString()}}

        )
        return res.modifiedCount === 1
    }
    async deleteAllsessionBesideCurrent(deviceId: string, userId: string):Promise<boolean>{
        const res = await this.securityDevicesModel.deleteMany(
            {userId: userId, deviceId: {$ne: deviceId}},
        )
        return res.deletedCount > 0
    }
    async deletAllData():Promise<boolean>{
        const res = await this.securityDevicesModel.deleteMany({})
        return res.deletedCount > 0
    }

}


