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
exports.BasicStrategy = void 0;
const passport_http_1 = require("passport-http");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let BasicStrategy = class BasicStrategy extends (0, passport_1.PassportStrategy)(passport_http_1.BasicStrategy) {
    constructor() {
        super({
            passReqToCallback: true
        });
        this.validate = async (req) => {
            const user = req.headers["authorization"];
            const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
            const isBase64 = base64regex.test(user?.split(" ").splice(1, 1).join(""));
            if (!user || !isBase64)
                throw new common_1.UnauthorizedException();
            const encode = atob(user?.split(" ").splice(1, 1).join(" "));
            const encodeArray = encode.split(":");
            if (encodeArray.length !== 2)
                throw new common_1.UnauthorizedException();
            if (encodeArray[0] === "admin" && encodeArray[1] === "qwerty") {
                return true;
            }
            else {
                return false;
            }
        };
    }
};
exports.BasicStrategy = BasicStrategy;
exports.BasicStrategy = BasicStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BasicStrategy);
//# sourceMappingURL=auth-basic.strategy.js.map