import { UserRepository } from './user.repository';
import { CreateUserDtoType, paramsUserPaginatorType, ResponseAllUserDto, User, userSqlDbType } from './user.schema';
import { SuperUsersService } from '../super-users/superUsers.service';
import { UserSqlRepository } from './userSql.repository';
import { DataConfirmationRepository } from './dataConfirmation.repository';
export declare class UserService {
    protected userRepository: UserRepository;
    protected suService: SuperUsersService;
    protected userSqlRepository: UserSqlRepository;
    protected confirmationDataRepository: DataConfirmationRepository;
    constructor(userRepository: UserRepository, suService: SuperUsersService, userSqlRepository: UserSqlRepository, confirmationDataRepository: DataConfirmationRepository);
    createUser(createUserDto: CreateUserDtoType): Promise<void>;
    findUsers(params: paramsUserPaginatorType): Promise<ResponseAllUserDto>;
    findById(id: string): Promise<userSqlDbType | null>;
    deleteUser(id: string): Promise<boolean>;
    validateUser(loginOrEmail: string, pass: string): Promise<userSqlDbType | null>;
    checkExistUser(email: string, login: string): Promise<User | null>;
    checkCodeConfirmation(code: string): Promise<boolean>;
    validateResendingUser(email: string): Promise<boolean>;
}
