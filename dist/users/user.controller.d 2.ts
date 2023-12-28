import { UserService } from './user.service';
import { CreateUserDtoType, paramsUserPaginatorType } from 'src/types/user.type';
export declare class UserController {
    protected userService: UserService;
    constructor(userService: UserService);
    getUsers(query: paramsUserPaginatorType): Promise<import("src/types/user.type").ResponseAllUserDto>;
    createUser(createUserDto: CreateUserDtoType): Promise<import("src/types/user.type").ResponseUserDtoType>;
    getUserById(userId: string): {
        id: number;
        name: string;
    };
    deleteUser(userId: string): Promise<void>;
}
