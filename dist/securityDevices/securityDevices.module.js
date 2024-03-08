"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityDevicesModule = void 0;
const common_1 = require("@nestjs/common");
const securityDevices_controller_1 = require("./securityDevices.controller");
const securityDevices_repository_1 = require("./securityDevices.repository");
const securityDevices_service_1 = require("./securityDevices.service");
const securityDevicesSql_repository_1 = require("./securityDevicesSql.repository");
const mongoose_1 = require("@nestjs/mongoose");
const securityDevices_schema_1 = require("./securityDevices.schema");
let SecurityDevicesModule = class SecurityDevicesModule {
};
exports.SecurityDevicesModule = SecurityDevicesModule;
exports.SecurityDevicesModule = SecurityDevicesModule = __decorate([
    (0, common_1.Module)({
        controllers: [securityDevices_controller_1.SecurityDevicesController],
        providers: [securityDevices_repository_1.SecurityDevicesRepository, securityDevices_service_1.SecurityDevicesService, securityDevicesSql_repository_1.SecurityDevicesSqlRepository],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: securityDevices_schema_1.SecurityDevices.name, schema: securityDevices_schema_1.SecurityDevicesSchema }
            ])
        ]
    })
], SecurityDevicesModule);
//# sourceMappingURL=securityDevices.module.js.map