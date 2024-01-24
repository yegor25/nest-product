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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUserInfoService = void 0;
const common_1 = require("@nestjs/common");
const requestUserInfo_repository_1 = require("./requestUserInfo.repository");
let RequestUserInfoService = class RequestUserInfoService {
    constructor(requestUserInfoRepository) {
        this.requestUserInfoRepository = requestUserInfoRepository;
    }
    async create(data) {
        return this.requestUserInfoRepository.saveRequest(data);
    }
    async checkRateLimiting(url, ip) {
        const count = await this.requestUserInfoRepository.countLastRequet(url, ip);
        if (count > 5)
            return false;
        return true;
    }
};
exports.RequestUserInfoService = RequestUserInfoService;
exports.RequestUserInfoService = RequestUserInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [requestUserInfo_repository_1.RequestUserInfoRepository])
], RequestUserInfoService);
//# sourceMappingURL=requestUserInfoService.js.map