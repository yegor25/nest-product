import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDtoType } from '../users/user.schema';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(loginOrEmail: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
    }>;
    registerUser(data: CreateUserDtoType): Promise<boolean>;
}
