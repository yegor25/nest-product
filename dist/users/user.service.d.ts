import { UserRepository } from './user.repository';
import { CreateUserDtoType, ResponseAllUserDto, ResponseUserDtoType, paramsUserPaginatorType } from 'src/types/user.type';
export declare class UserService {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDtoType): Promise<ResponseUserDtoType>;
    findUsers(params: paramsUserPaginatorType): Promise<ResponseAllUserDto>;
    deleteUser(id: string): Promise<boolean>;
}
