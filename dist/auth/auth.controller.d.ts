import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { CreateUserDtoType, User, loginDtoType } from "../users/user.schema";
export declare class AuthController {
    protected authService: AuthService;
    protected userService: UserService;
    constructor(authService: AuthService, userService: UserService);
    loginUser(req: {
        user: User;
    }, body: loginDtoType): Promise<{
        accessToken: string;
    }>;
    register(createUserDto: CreateUserDtoType): Promise<void>;
    registerConfirmation(body: {
        code: string;
    }): Promise<void>;
    resendingEmail(body: {
        email: string;
    }): Promise<void>;
}
