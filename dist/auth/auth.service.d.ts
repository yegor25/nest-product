import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/user.repository';
import { CreateSuDtoType } from '../super-users/su.schema';
import { DataConfirmationRepository } from '../users/dataConfirmation.repository';
export declare class AuthService {
    private usersService;
    private jwtService;
    private userRepository;
    private dataConfirmationRepository;
    constructor(usersService: UserService, jwtService: JwtService, userRepository: UserRepository, dataConfirmationRepository: DataConfirmationRepository);
    validateUser(loginOrEmail: string, pass: string): Promise<any>;
    login(userId: string, deviceId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registerUser(data: CreateSuDtoType): Promise<any>;
    confirmUser(code: string): Promise<boolean>;
    resendingEmail(email: string): Promise<void>;
}
