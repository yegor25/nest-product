import { Repository } from "typeorm";
import { CreatedUserDtoDbType, userSqlDbType } from "./user.schema";
import { Users } from "./entities/user.entity";
export declare class UserSqlRepository {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    validate(loginOrEmail: string, pass: string): Promise<userSqlDbType | null>;
    findById(id: string): Promise<userSqlDbType | null>;
    registerUser(dto: CreatedUserDtoDbType): Promise<string>;
    checkCodeConfirmation(code: string): Promise<{
        userId: string;
        expirationDate: Date;
        isActiveAccount: boolean;
    } | null>;
    activateAccount(userId: string): Promise<userSqlDbType>;
    validateResendingUser(email: string): Promise<string | null>;
}
