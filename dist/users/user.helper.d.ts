import { ResponseUserDtoType, dbUsersPaginatorType, paramsUserPaginatorType } from 'src/types/user.type';
import { User } from './user.schema';
export declare const userHelper: {
    userViewMapper(userDb: User): ResponseUserDtoType;
    usersParamsMapper(params: paramsUserPaginatorType): dbUsersPaginatorType;
};
