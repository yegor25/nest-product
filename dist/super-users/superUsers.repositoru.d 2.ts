import { CreatedUserDtoDbType, ResponseAllUserDto, paramsUserPaginatorType } from "../users/user.schema";
import { DataSource, Repository } from "typeorm";
import { Users } from "../users/entities/user.entity";
export declare class SuperUserRepository {
    protected dataSourse: DataSource;
    protected userRepo: Repository<Users>;
    constructor(dataSourse: DataSource, userRepo: Repository<Users>);
    create(dto: CreatedUserDtoDbType): Promise<{
        id: string;
        createdAt: string;
    }>;
    checkByEmail(email: string): Promise<boolean>;
    checkByLogin(login: string): Promise<boolean>;
    deleteAll(): Promise<void>;
    findById(id: string): Promise<Users | null>;
    deleteUser(id: string): Promise<boolean>;
    finddAll(params: paramsUserPaginatorType): Promise<ResponseAllUserDto>;
}
