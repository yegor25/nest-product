import { User } from 'src/users/user.schema';
import { PaginatorType, SortDirection } from './common.type';

export type CreateUserDtoType = {
  login: string;
  password: string;
  email: string;
};
export type ResponseUserDtoType = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type ResponseAllUserDto = PaginatorType & {
  items: ResponseUserDtoType[];
};

export type paramsUserPaginatorType = {
  pageNumber: string;
  pageSize: string;
  searchLoginTerm: string;
  searchEmailTerm: string;
  sortBy: keyof User;
  sortDirection: SortDirection;
};

export type dbUsersPaginatorType = {
  searchLoginTerm: string;
  searchEmailTerm: string;
  sortBy: keyof User;
  sortDirection: 1 | -1;
  pageNumber: number;
  pageSize: number;
};
