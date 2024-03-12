"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsHelper = void 0;
const uuid_1 = require("uuid");
exports.sessionsHelper = {
    sessionMapperForDb(data) {
        const { ip, title, userId } = data;
        const res = {
            title,
            userId,
            ip,
            deviceId: (0, uuid_1.v4)(),
            lastActiveDate: new Date().toISOString(),
            isActive: true
        };
        return res;
    },
    sessionViewMapper(data) {
        const { ip, title, lastActiveDate, deviceId } = data;
        const res = {
            ip,
            title,
            lastActiveDate,
            deviceId
        };
        return res;
    },
    sesionsViewMapperArray(data) {
        return data.map(el => this.sessionViewMapper(el));
    }
};
//# sourceMappingURL=session.helper.js.map