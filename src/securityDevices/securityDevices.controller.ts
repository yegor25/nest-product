import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Req } from "@nestjs/common";
import { SecurityDevicesService } from "./securityDevices.service";
import { Request } from "express";
import { User } from "../users/user.schema";



@Controller('security')
export class SecurityDevicesController {
    constructor(
        protected securityDevicesService: SecurityDevicesService
    ){}

    @Get('devices')
    async getById(@Req() req:Request<{},{},{user:User},{}>){
        const user = req.body.user
        const result = await this.securityDevicesService.getAllSessions(user._id.toString())
        if (!result)  throw new NotFoundException();
        return result
    }

    @HttpCode(204)
    @Delete('devices/:deviceId')
    async deleteDeviceById(@Param('deviceId') deviceId: string, @Body() data: {user: User}){
        const session = await this.securityDevicesService.checkUserSession(deviceId)
        if(!session) throw new NotFoundException();
        if(session.userId !== data.user._id.toString()) throw new ForbiddenException();
        await this.securityDevicesService.deleteDeviceSession(deviceId)
        return
    }

    @HttpCode(204)
    @Delete('devices')
    async deleteAllSessionsBesideCurrent(@Req() req:Request<{},{},{user:User,deviceId: string},{}>){
        await this.securityDevicesService.deleteAllsessionBesideCurrent(req.body.deviceId,req.body.user._id.toString())
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