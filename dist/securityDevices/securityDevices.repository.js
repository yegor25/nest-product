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
exports.SecurityDevicesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const securityDevices_schema_1 = require("./securityDevices.schema");
const mongoose_2 = require("mongoose");
const session_helper_1 = require("./session.helper");
let SecurityDevicesRepository = class SecurityDevicesRepository {
    constructor(securityDevicesModel) {
        this.securityDevicesModel = securityDevicesModel;
    }
    async create(dto) {
        const newSes = new this.securityDevicesModel(dto);
        await newSes.save();
        return newSes;
    }
    async getSession(deviceId) {
        const res = await this.securityDevicesModel.findOne({ deviceId: deviceId });
        if (res)
            return session_helper_1.sessionsHelper.sessionViewMapper(res);
        return null;
    }
    async getAllSessions(userId) {
        const res = await this.securityDevicesModel.find({ userId: userId, isActive: true }).lean();
        if (!res)
            return null;
        return session_helper_1.sessionsHelper.sesionsViewMapperArray(res);
    }
    async checkUserSession(deviceId) {
        const res = await this.securityDevicesModel.findOne({ deviceId: deviceId });
        return res;
    }
    async checkSession(data) {
        const res = await this.securityDevicesModel.findOne({ userId: data.userId, title: data.title, ip: data.ip });
        if (!res)
            return null;
        return res.deviceId;
    }
    async deleteDeviceSession(deviceId) {
        const res = await this.securityDevicesModel.deleteOne({ deviceId: deviceId });
        return res.deletedCount === 1;
    }
    async deactivateSession(deviceId) {
        const res = await this.securityDevicesModel.updateOne({ deviceId: deviceId }, { $set: { isActive: false } });
        return res.modifiedCount === 1;
    }
    async changeActiveDate(deviceId) {
        const res = await this.securityDevicesModel.updateOne({ deviceId: deviceId }, { $set: { lastActiveDate: new Date().toISOString() } });
        return res.modifiedCount === 1;
    }
    async deleteAllsessionBesideCurrent(deviceId, userId) {
        const res = await this.securityDevicesModel.deleteMany({ userId: userId, deviceId: { $ne: deviceId } });
        return res.deletedCount > 0;
    }
    async deletAllData() {
        const res = await this.securityDevicesModel.deleteMany({});
        return res.deletedCount > 0;
    }
};
exports.SecurityDevicesRepository = SecurityDevicesRepository;
exports.SecurityDevicesRepository = SecurityDevicesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(securityDevices_schema_1.SecurityDevices.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SecurityDevicesRepository);
//# sourceMappingURL=securityDevices.repository.js.map