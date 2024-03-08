"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUserInfoRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const requestUserInfo_schema_1 = require("./requestUserInfo.schema");
const mongoose_2 = require("mongoose");
let RequestUserInfoRepository = class RequestUserInfoRepository {
    constructor(requestUserInfoModel) {
        this.requestUserInfoModel = requestUserInfoModel;
    }
    async saveRequest(data) {
        const res = await this.requestUserInfoModel.create(data);
        return data;
    }
    async countLastRequet(url, ip) {
        const filterDate = new Date(Date.now() - 10000);
        const count = await this.requestUserInfoModel.countDocuments({ URL: url, IP: ip, date: { $gte: new Date(filterDate) } });
        return count;
    }
};
exports.RequestUserInfoRepository = RequestUserInfoRepository;
exports.RequestUserInfoRepository = RequestUserInfoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(requestUserInfo_schema_1.UserRequestInfo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RequestUserInfoRepository);
//# sourceMappingURL=requestUserInfo.repository.js.map