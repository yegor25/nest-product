"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHelper = void 0;
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
class AuthHelper {
    confiramtionDataMapper() {
        const data = {
            code: (0, uuid_1.v4)(),
            expirationDate: (0, date_fns_1.addDays)(new Date(), 3),
            isConfirmed: false
        };
        return data;
    }
}
exports.authHelper = new AuthHelper();
//# sourceMappingURL=authHelper.js.map