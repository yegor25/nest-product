import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../../users/user.service";
import { TokenService } from "../../tokens/token.service";
import { SecurityDevicesRepository } from "../../securityDevices/securityDevices.repository";
import { SecurityDevicesSqlRepository } from "../../securityDevices/securityDevicesSql.repository";
export declare class CheckRefreshToken implements NestMiddleware {
    jwtService: JwtService;
    private userService;
    protected tokenService: TokenService;
    protected securityDevicesRepository: SecurityDevicesRepository;
    protected securityDevicesSqlRepository: SecurityDevicesSqlRepository;
    constructor(jwtService: JwtService, userService: UserService, tokenService: TokenService, securityDevicesRepository: SecurityDevicesRepository, securityDevicesSqlRepository: SecurityDevicesSqlRepository);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
