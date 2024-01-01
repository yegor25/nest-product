import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { User, loginDtoType } from "../users/user.schema";
export declare class AuthController {
    protected authService: AuthService;
    protected userService: UserService;
    constructor(authService: AuthService, userService: UserService);
    loginUser(req: {
        user: User;
    }, body: loginDtoType): Promise<{
        accessToken: string;
    }>;
}
