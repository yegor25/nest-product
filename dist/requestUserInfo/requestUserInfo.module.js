"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUserInfoModule = void 0;
const common_1 = require("@nestjs/common");
const requestUserInfoService_1 = require("./requestUserInfoService");
const requestUserInfo_repository_1 = require("./requestUserInfo.repository");
const mongoose_1 = require("@nestjs/mongoose");
const requestUserInfo_schema_1 = require("./requestUserInfo.schema");
let RequestUserInfoModule = class RequestUserInfoModule {
};
exports.RequestUserInfoModule = RequestUserInfoModule;
exports.RequestUserInfoModule = RequestUserInfoModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [requestUserInfoService_1.RequestUserInfoService, requestUserInfo_repository_1.RequestUserInfoRepository],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: requestUserInfo_schema_1.UserRequestInfo.name, schema: requestUserInfo_schema_1.UserRequestInfoSchema }
            ])
        ]
    })
], RequestUserInfoModule);
//# sourceMappingURL=requestUserInfo.module.js.map