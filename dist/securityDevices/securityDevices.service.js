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
exports.SecurityDevicesService = void 0;
const common_1 = require("@nestjs/common");
const securityDevices_repository_1 = require("./securityDevices.repository");
const session_helper_1 = require("./session.helper");
const securityDevicesSql_repository_1 = require("./securityDevicesSql.repository");
let SecurityDevicesService = class SecurityDevicesService {
    constructor(securityDevicesRepository, secutityDevicesSqlRepository) {
        this.securityDevicesRepository = securityDevicesRepository;
        this.secutityDevicesSqlRepository = secutityDevicesSqlRepository;
    }
    async create(dto) {
        const data = session_helper_1.sessionsHelper.sessionMapperForDb(dto);
        return this.secutityDevicesSqlRepository.create(data);
    }
    async getSession(deviceId) {
        return this.secutityDevicesSqlRepository.getSession(deviceId);
    }
    async getAllSessions(userId) {
        return this.secutityDevicesSqlRepository.getAllSessions(userId);
    }
    async checkUserSession(deviceId) {
        return this.secutityDevicesSqlRepository.checkUserSession(deviceId);
    }
    async checkSession(dto) {
        return this.secutityDevicesSqlRepository.checkSession(dto);
    }
    async deleteDeviceSession(deviceId) {
        return this.secutityDevicesSqlRepository.deleteDeviceSession(deviceId);
    }
    async deactivateSession(deviceId) {
        return this.secutityDevicesSqlRepository.deactivateSession(deviceId);
    }
    async changeActiveDate(deviceId) {
        return this.secutityDevicesSqlRepository.changeActiveDate(deviceId);
    }
    async deleteAllsessionBesideCurrent(deviceId, userId) {
        return this.secutityDevicesSqlRepository.deleteAllsessionBesideCurrent(deviceId, userId);
    }
};
exports.SecurityDevicesService = SecurityDevicesService;
exports.SecurityDevicesService = SecurityDevicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [securityDevices_repository_1.SecurityDevicesRepository,
        securityDevicesSql_repository_1.SecurityDevicesSqlRepository])
], SecurityDevicesService);
//# sourceMappingURL=securityDevices.service.js.map