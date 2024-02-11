import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDtoType } from '../users/user.schema';
import { UserRepository } from 'src/users/user.repository';
export declare class AuthService {
    private usersService;
    private jwtService;
    private userRepository;
    constructor(usersService: UserService, jwtService: JwtService, userRepository: UserRepository);
    validateUser(loginOrEmail: string, pass: string): Promise<any>;
    login(userId: string, deviceId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registerUser(data: CreateUserDtoType): Promise<any>;
    confirmUser(code: string): Promise<boolean>;
    resendingEmail(email: string): Promise<void>;
}
