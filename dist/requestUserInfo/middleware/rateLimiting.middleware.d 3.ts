import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { RequestUserInfoService } from "../requestUserInfoService";
export declare class RateLimiting implements NestMiddleware {
    protected requestUserInfoService: RequestUserInfoService;
    constructor(requestUserInfoService: RequestUserInfoService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
