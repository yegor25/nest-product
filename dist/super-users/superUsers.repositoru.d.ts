import { CreatedUserDtoDbType, ResponseAllUserDto, paramsUserPaginatorType } from "../users/user.schema";
import { DataSource } from "typeorm";
export declare class SuperUserRepository {
    protected dataSourse: DataSource;
    constructor(dataSourse: DataSource);
    create(dto: CreatedUserDtoDbType): Promise<{
        id: string;
        createdAt: string;
    }>;
    checkByEmail(email: string): Promise<boolean>;
    checkByLogin(login: string): Promise<boolean>;
    deleteAll(): Promise<any>;
    findById(id: string): Promise<any>;
    deleteUser(id: string): Promise<boolean>;
    finddAll(params: paramsUserPaginatorType): Promise<ResponseAllUserDto>;
}
