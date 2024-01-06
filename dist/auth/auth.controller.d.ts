import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { CreateUserDtoType, User } from "../users/user.schema";
import { Response } from "express";
export declare class AuthController {
    protected authService: AuthService;
    protected userService: UserService;
    constructor(authService: AuthService, userService: UserService);
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
}
