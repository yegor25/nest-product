import { ResponseUserDtoType, User, dbUsersPaginatorType, paramsUserPaginatorType } from './user.schema';
export declare const userHelper: {
    userViewMapper(userDb: User): ResponseUserDtoType;
    usersParamsMapper(params: paramsUserPaginatorType): dbUsersPaginatorType;
};
