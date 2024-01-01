import { UserRepository } from './user.repository';
import { CreateUserDtoType, ResponseUserDtoType, paramsUserPaginatorType, ResponseAllUserDto, User } from './user.schema';
export declare class UserService {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDtoType): Promise<ResponseUserDtoType>;
    findUsers(params: paramsUserPaginatorType): Promise<ResponseAllUserDto>;
    deleteUser(id: string): Promise<boolean>;
    validateUser(loginOrEmail: string, pass: string): Promise<User | null>;
}
