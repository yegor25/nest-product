import {
  ResponseUserDtoType,
  dbUsersPaginatorType,
  paramsUserPaginatorType,
} from 'src/types/user.type';
import { User } from './user.schema';
import { SortDirection } from 'src/types/common-type';

export const userHelper = {
  userViewMapper(userDb: User): ResponseUserDtoType {
    const res: ResponseUserDtoType = {
      id: userDb._id.toString(),
      login: userDb.login,
      email: userDb.email,
      createdAt: userDb.createdAt,
    };
    return res;
  },
  usersParamsMapper(params: paramsUserPaginatorType): dbUsersPaginatorType {
    const res: dbUsersPaginatorType = {
      searchEmailTerm: params.searchEmailTerm ? params.searchEmailTerm : '',
      searchLoginTerm: params.searchLoginTerm ? params.searchLoginTerm : '',
      sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
      pageNumber: params.pageNumber ? +params.pageNumber : 1,
      pageSize: params.pageSize ? +params.pageSize : 10,
      sortBy: params.sortBy ? params.sortBy : 'createdAt',
    };
    return res;
  },
};
