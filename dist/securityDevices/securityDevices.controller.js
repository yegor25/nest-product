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
exports.SecurityDevicesController = void 0;
const common_1 = require("@nestjs/common");
const securityDevices_service_1 = require("./securityDevices.service");
let SecurityDevicesController = class SecurityDevicesController {
    constructor(securityDevicesService) {
        this.securityDevicesService = securityDevicesService;
    }
    async getById(req) {
        const user = req.body.user;
        const result = await this.securityDevicesService.getAllSessions(user._id.toString());
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    async deleteAllSessionsBesideCurrent() {
        return;
    }
};
exports.SecurityDevicesController = SecurityDevicesController;
__decorate([
    (0, common_1.Get)('devices'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "getById", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)('devices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "deleteAllSessionsBesideCurrent", null);
exports.SecurityDevicesController = SecurityDevicesController = __decorate([
    (0, common_1.Controller)('security'),
    __metadata("design:paramtypes", [securityDevices_service_1.SecurityDevicesService])
], SecurityDevicesController);
//# sourceMappingURL=securityDevices.controller.js.map