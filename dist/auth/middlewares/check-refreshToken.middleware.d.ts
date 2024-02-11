import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../../users/user.service";
import { TokenService } from "../../tokens/token.service";
import { SecurityDevicesRepository } from "../../securityDevices/securityDevices.repository";
export declare class CheckRefreshToken implements NestMiddleware {
    jwtService: JwtService;
    private userService;
    protected tokenService: TokenService;
    protected securityDevicesRepository: SecurityDevicesRepository;
    constructor(jwtService: JwtService, userService: UserService, tokenService: TokenService, securityDevicesRepository: SecurityDevicesRepository);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
