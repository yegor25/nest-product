import { SuperUserRepository } from "./superUsers.repositoru";
import { ResponseUserDtoType, paramsUserPaginatorType } from "../users/user.schema";
import { CreateSuDtoType } from "./su.schema";
export declare class SuperUsersService {
    protected superUserRepository: SuperUserRepository;
    constructor(superUserRepository: SuperUserRepository);
    create(dto: CreateSuDtoType): Promise<ResponseUserDtoType>;
    checkEmail(email: string): Promise<boolean>;
    checkLogin(login: string): Promise<boolean>;
    findById(id: string): Promise<import("../users/entities/user.entity").Users | null>;
    deleteUser(id: string): Promise<boolean>;
    deleteAll(): Promise<void>;
    findAll(params: paramsUserPaginatorType): Promise<import("../users/user.schema").ResponseAllUserDto>;
}
