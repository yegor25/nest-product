import { DataSource } from "typeorm";
import { paramsUserPaginatorType } from "../users/user.schema";
import { SuperUsersService } from "./superUsers.service";
import { CreateSuDtoType } from "./su.schema";
export declare class SuperUserController {
    protected superUsersService: SuperUsersService;
    protected dataSorce: DataSource;
    constructor(superUsersService: SuperUsersService, dataSorce: DataSource);
    createUser(createUserDto: CreateSuDtoType): Promise<import("../users/user.schema").ResponseUserDtoType>;
    deleteUser(userId: string): Promise<void>;
    getUsers(query: paramsUserPaginatorType): Promise<import("../users/user.schema").ResponseAllUserDto>;
}
