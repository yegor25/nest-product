import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { createSecurityDevicesDto, securityDevicesInputType, securityDevicesSqlDbType, securityDevicesViewType } from "./securityDevices.schema";


@Injectable()
export class SecurityDevicesSqlRepository  {
    constructor(
        @InjectDataSource() protected dataSource: DataSource
    ){}
    async create(dto:createSecurityDevicesDto){
        const {ip,title,lastActiveDate,deviceId,isActive,userId} = dto
        const newSes = await this.dataSource.query(`
            insert into public."SecurityDevices"
            ("ip","title","lastActiveDate","deviceId","isActive","userId")
            values($1,$2,$3,$4,$5,$6)
            returning*;
        `,[ip,title,lastActiveDate,deviceId,isActive,userId])
        return newSes[0]
    }
    async getSession(deviceId:string):Promise<securityDevicesViewType>{
        const ses = await this.dataSource.query<securityDevicesViewType[]>(`
            select s."ip",s."title",s."lastActiveDate",s."deviceId" from public."SecurityDevices" s
            where s."deviceId" = $1;
        `,[deviceId])
        return ses[0]
    }
    async getAllSessions(userId: string):Promise<securityDevicesViewType[]>{
        const ses = await this.dataSource.query<securityDevicesViewType[]>(`
            select s."ip",s."title",s."lastActiveDate",s."deviceId" from public."SecurityDevices" s
            where s."userId" = $1 AND s."isActive" = 'true';
        `,[userId])
        return ses
    }

    async checkUserSession(deviceId: string){
        const ses = await this.dataSource.query<securityDevicesSqlDbType[]>(`
            select * from public."SecurityDevices" s
            where s."deviceId" = $1;
        `,[deviceId])
        return ses[0]
    }
    async checkSession(dto: securityDevicesInputType):Promise<string | null>{
        const {userId,title,ip} = dto
        const ses = await this.dataSource.query(`
            select s."deviceId" from public."SecurityDevices" s
            where s."userId" = $1 AND s."title" = $2 AND s."ip" = $1;
        `,[userId,title,ip])
        if(ses[0]) return ses[0]
        return null
    }
    async checkActiveSession(deviceId: string):Promise<boolean>{
        const device = await this.dataSource.query<securityDevicesSqlDbType[]>(`
            select * from public."SecurityDevices" s
            where s."deviceId" = $1;
        `,[deviceId])
        if(!device[0] || !device[0].isActive) return false
        return true
    }
    async deleteDeviceSession(deviceId: string):Promise<boolean>{
        const deletedItem = await this.dataSource.query(`
            delete from public."SecurityDevices" s
            where s."deviceId" = $1
        `,[deviceId])
        console.log("del", deletedItem)
        if(deletedItem[1] === 1) return true
        return false
    }
    async deactivateSession(deviceId: string):Promise<boolean>{
        const ses = await this.dataSource.query(`
            update public."SecurityDevices" as s
            set "isActive" = 'false'
            where s."deviceId" = $1
            returning *;
        `,[deviceId])
        return true
    }

    async changeActiveDate(deviceId: string){
        const ses = await this.dataSource.query(`
        update public."SecurityDevices" as s
        set "lastActiveDate" = '${new Date().toISOString()}'
        where s."deviceId" = $1
        returning *;
        `,[deviceId])
        return true
    }
    async deleteAllsessionBesideCurrent(deviceId: string, userId: string):Promise<boolean>{
        const result = await this.dataSource.query(`
            delete from public."SecurityDevices" as s
            where s."userId" = $1 AND s."deviceId" <> $2;
        `,[userId,deviceId])
        return true
    }
    async deleteAllData():Promise<boolean>{
        const deleted = await this.dataSource.query(`
            delete from public."SecurityDevices";
        `)
        return true
    }
}