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
exports.CheckRefreshToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const user_service_1 = require("../../users/user.service");
let CheckRefreshToken = class CheckRefreshToken {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async use(req, res, next) {
        console.log("ref", req.cookies);
        const token = req.cookies.refreshToken;
        if (!token) {
            res.sendStatus(401);
            return;
        }
        try {
            const data = await this.jwtService.verify(token, { secret: constants_1.jwtConstants.refreshSecret });
            if (data) {
                const user = await this.userService.findById(data.sub);
                req.body.user = user;
                next();
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.CheckRefreshToken = CheckRefreshToken;
exports.CheckRefreshToken = CheckRefreshToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], CheckRefreshToken);
//# sourceMappingURL=check-refreshToken.middleware.js.map