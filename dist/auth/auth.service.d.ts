import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDtoType, User } from '../users/user.schema';
import { UserRepository } from 'src/users/user.repository';
export declare class AuthService {
    private usersService;
    private jwtService;
    private userRepository;
    constructor(usersService: UserService, jwtService: JwtService, userRepository: UserRepository);
    validateUser(loginOrEmail: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
    }>;
    registerUser(data: CreateUserDtoType): Promise<User | null>;
    confirmUser(code: string): Promise<boolean>;
    resendingEmail(email: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
