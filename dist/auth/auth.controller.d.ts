import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { CreateUserDtoType, User } from "../users/user.schema";
import { Request, Response } from "express";
import { TokenService } from "src/tokens/token.service";
export declare class AuthController {
    protected authService: AuthService;
    protected userService: UserService;
    protected tokenService: TokenService;
    constructor(authService: AuthService, userService: UserService, tokenService: TokenService);
    loginUser(req: {
        user: User;
    }, res: Response): Promise<void>;
    resendingEmail(body: {
        email: string;
    }): Promise<void>;
    register(createUserDto: CreateUserDtoType): Promise<any>;
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
    }, {}>, res: Response): Promise<void>;
    refreshToken(req: Request<{}, {}, {
        user: User;
    }, {}>, res: Response): Promise<void>;
}
