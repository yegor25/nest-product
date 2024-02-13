import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Req } from "@nestjs/common";
import { SecurityDevicesService } from "./securityDevices.service";
import { Request } from "express";
import { User, userSqlDbType } from "../users/user.schema";



@Controller('security')
export class SecurityDevicesController {
    constructor(
        protected securityDevicesService: SecurityDevicesService
    ){}

    @Get('devices')
    async getAllActiveSessions(@Req() req:Request<{},{},{user:userSqlDbType},{}>){
        const user = req.body.user
        const result = await this.securityDevicesService.getAllSessions(user.id)
        if (!result)  throw new NotFoundException();
        return result
    }

    @HttpCode(204)
    @Delete('devices/:deviceId')
    async deleteDeviceById(@Param('deviceId') deviceId: string, @Body() data: {user: userSqlDbType}){
        const session = await this.securityDevicesService.checkUserSession(deviceId)
        if(!session) throw new NotFoundException();
        if(session.userId !== data.user.id) throw new ForbiddenException();
        await this.securityDevicesService.deleteDeviceSession(deviceId)
        return
    }

    @HttpCode(204)
    @Delete('devices')
    async deleteAllSessionsBesideCurrent(@Req() req:Request<{},{},{user:userSqlDbType,deviceId: string},{}>){
        await this.securityDevicesService.deleteAllsessionBesideCurrent(req.body.deviceId,req.body.user.id)
        return
    }

   
    //     const session = await sessionsQuery.checkUserSession(req.params.deviceId)
    //     if (session && session.userId !== req.user?._id.toString()) {
    //         res.sendStatus(403)
    //         return
    //     }
    //     const result = await sessionService.deleteSession(req.params.deviceId)
    //     if (!result) {
    //         res.sendStatus(404)
    //         return
    //     }
       
    //     res.sendStatus(204)
}