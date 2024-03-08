import { SuperUserRepository } from "./superUsers.repositoru";
import { ResponseUserDtoType, paramsUserPaginatorType } from "../users/user.schema";
import { CreateSuDtoType } from "./su.schema";
export declare class SuperUsersService {
    protected superUserRepository: SuperUserRepository;
    constructor(superUserRepository: SuperUserRepository);
    create(dto: CreateSuDtoType): Promise<ResponseUserDtoType>;
    checkEmail(email: string): Promise<boolean>;
    checkLogin(login: string): Promise<boolean>;
    findById(id: string): Promise<any>;
    deleteUser(id: string): Promise<boolean>;
    deleteAll(): Promise<any>;
    findAll(params: paramsUserPaginatorType): Promise<import("../users/user.schema").ResponseAllUserDto>;
}
