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
exports.RateLimiting = void 0;
const common_1 = require("@nestjs/common");
const requestUserInfoService_1 = require("../requestUserInfoService");
let RateLimiting = class RateLimiting {
    constructor(requestUserInfoService) {
        this.requestUserInfoService = requestUserInfoService;
    }
    async use(req, res, next) {
        const URL = req.originalUrl;
        const IP = req.ip;
        const date = new Date();
        await this.requestUserInfoService.create({ URL, IP, date });
        const isAllowed = await this.requestUserInfoService.checkRateLimiting(URL, IP);
        if (!isAllowed) {
            res.sendStatus(429);
            return;
        }
        else {
            next();
        }
    }
};
exports.RateLimiting = RateLimiting;
exports.RateLimiting = RateLimiting = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [requestUserInfoService_1.RequestUserInfoService])
], RateLimiting);
//# sourceMappingURL=rateLimiting.middleware.js.map