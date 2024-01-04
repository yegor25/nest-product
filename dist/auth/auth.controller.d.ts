import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { CreateUserDtoType, User, loginDtoType } from "../users/user.schema";
export declare class AuthController {
    protected authService: AuthService;
    protected userService: UserService;
    constructor(authService: AuthService, userService: UserService);
    loginUser(req: {
        user: User;
    }, body: loginDtoType, res: any): Promise<{
        accessToken: string;
    }>;
    resendingEmail(body: {
        email: string;
    }): Promise<void>;
    register(createUserDto: CreateUserDtoType): Promise<any>;
    registerConfirmation(body: {
        code: string;
    }): Promise<void>;
}
