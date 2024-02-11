import { UserRepository } from './user.repository';
import { CreateUserDtoType, ResponseUserDtoType, paramsUserPaginatorType, ResponseAllUserDto, User, EmailConfirmation } from './user.schema';
export declare class UserService {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDtoType, emailData?: EmailConfirmation): Promise<ResponseUserDtoType>;
    findUsers(params: paramsUserPaginatorType): Promise<ResponseAllUserDto>;
    findById(id: string): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
    validateUser(loginOrEmail: string, pass: string): Promise<User | null>;
    checkExistUser(email: string, login: string): Promise<User | null>;
    checkCodeConfirmation(code: string): Promise<boolean>;
    validateResendingUser(email: string): Promise<boolean>;
}
