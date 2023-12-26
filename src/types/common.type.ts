export type PaginatorType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}
