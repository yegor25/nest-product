import { Controller, Delete, Get, HttpCode, NotFoundException, Req } from "@nestjs/common";
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
    @Delete('devices')
    async deleteAllSessionsBesideCurrent(){
        // await this.securityDevicesService.deleteAllsessionBesideCurrent()
        return
    }
}