import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/users/user.service";
import { TokenService } from "src/tokens/token.service";
export declare class CheckRefreshToken implements NestMiddleware {
    jwtService: JwtService;
    private userService;
    protected tokenService: TokenService;
    constructor(jwtService: JwtService, userService: UserService, tokenService: TokenService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
