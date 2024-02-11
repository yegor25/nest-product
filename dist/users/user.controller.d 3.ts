import { UserService } from './user.service';
import { paramsUserPaginatorType, CreateUserDtoType } from './user.schema';
export declare class UserController {
    protected userService: UserService;
    constructor(userService: UserService);
    getUsers(query: paramsUserPaginatorType): Promise<import("./user.schema").ResponseAllUserDto>;
    createUser(createUserDto: CreateUserDtoType): Promise<import("./user.schema").ResponseUserDtoType>;
    getUserById(userId: string): {
        id: number;
        name: string;
    } | undefined;
    deleteUser(userId: string): Promise<void>;
}
