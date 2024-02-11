import { DataSource } from "typeorm";
import { CreatedUserDtoDbType, userSqlDbType } from "./user.schema";
export declare class UserSqlRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    validate(loginOrEmail: string, pass: string): Promise<userSqlDbType | null>;
    findById(id: string): Promise<userSqlDbType | null>;
    registerUser(dto: CreatedUserDtoDbType): Promise<string>;
    checkCodeConfirmation(code: string): Promise<{
        userId: string;
        expirationDate: Date;
        isActiveAccount: boolean;
    }>;
    activateAccount(userId: string): Promise<userSqlDbType>;
    validateResendingUser(email: string): Promise<boolean>;
}
