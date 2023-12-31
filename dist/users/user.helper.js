"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHelper = void 0;
const user_schema_1 = require("./user.schema");
exports.userHelper = {
    userViewMapper(userDb) {
        const res = {
            id: userDb._id.toString(),
            login: userDb.login,
            email: userDb.email,
            createdAt: userDb.createdAt,
        };
        return res;
    },
    usersParamsMapper(params) {
        const res = {
            searchEmailTerm: params.searchEmailTerm ? params.searchEmailTerm : '',
            searchLoginTerm: params.searchLoginTerm ? params.searchLoginTerm : '',
            sortDirection: params.sortDirection === user_schema_1.SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? +params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : 'createdAt',
        };
        return res;
    },
};
//# sourceMappingURL=user.helper.js.map