import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/users/user.service";
export declare class CheckRefreshToken implements NestMiddleware {
    jwtService: JwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
