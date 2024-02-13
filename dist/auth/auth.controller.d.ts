import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { User, userSqlDbType } from "../users/user.schema";
import { Response, Request } from "express";
import { TokenService } from "../tokens/token.service";
import { SecurityDevicesService } from "../securityDevices/securityDevices.service";
import { CreateSuDtoType } from "../super-users/su.schema";
export declare class AuthController {
    protected authService: AuthService;
    protected userService: UserService;
    protected tokenService: TokenService;
    protected securityDevicesService: SecurityDevicesService;
    constructor(authService: AuthService, userService: UserService, tokenService: TokenService, securityDevicesService: SecurityDevicesService);
    loginUser(req: {
        user: userSqlDbType;
        ip: string;
        headers: {
            "user-agent": string | any;
        };
    }, res: Response): Promise<void>;
    resendingEmail(body: {
        email: string;
    }): Promise<void>;
    register(createUserDto: CreateSuDtoType): Promise<any>;
    registerConfirmation(body: {
        code: string;
    }): Promise<void>;
    authMe(req: {
        user: {
            userId: string;
            login: string;
        };
    }): Promise<{
        email: string;
        login: string;
        userId: string;
    }>;
    logout(req: Request<{}, {}, {
        user: User;
        deviceId: string;
    }, {}>, res: Response): Promise<void>;
    refreshToken(req: Request<{}, {}, {
        user: User;
        deviceId: string;
    }, {}>, res: Response): Promise<void>;
}
