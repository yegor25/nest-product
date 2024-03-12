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
exports.CheckGuess = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let CheckGuess = class CheckGuess {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        if (!req.headers.authorization) {
            req.query.userId = "";
            next();
        }
        else {
            const token = req.headers.authorization;
            const payload = token.split(" ")[1];
            try {
                const data = await this.jwtService.verify(payload);
                if (data)
                    req.query.userId = data.sub;
                next();
            }
            catch (error) {
                req.query.userId = "";
                next();
            }
        }
    }
};
exports.CheckGuess = CheckGuess;
exports.CheckGuess = CheckGuess = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], CheckGuess);
//# sourceMappingURL=check-guess.middleware.js.map