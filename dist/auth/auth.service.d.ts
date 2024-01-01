import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(loginOrEmail: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
    }>;
}
