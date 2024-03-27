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
exports.SecurityDevicesSqlRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const securityDevices_entity_1 = require("./securityDevices.entity");
let SecurityDevicesSqlRepository = class SecurityDevicesSqlRepository {
    constructor(dataSource, secDevRepository) {
        this.dataSource = dataSource;
        this.secDevRepository = secDevRepository;
    }
    async create(dto) {
        const { ip, title, lastActiveDate, deviceId, isActive, userId } = dto;
        const newSes = await this.secDevRepository
            .createQueryBuilder()
            .insert()
            .into(securityDevices_entity_1.SecurityDevices)
            .values({ ip, title, lastActiveDate, deviceId, isActive, userId })
            .returning([
            "ip",
            "title",
            "lastActiveDate",
            "deviceId",
            "isActive",
            "userId",
        ])
            .execute();
        return newSes.raw[0];
    }
    async getSession(deviceId) {
        const ses = await this.secDevRepository
            .createQueryBuilder("s")
            .select(["s.ip", "s.title", "s.lastActiveDate", "s.deviceId"])
            .where("s.deviceId = :id", { id: deviceId })
            .execute();
        console.log("ses", ses);
        return ses;
    }
    async getAllSessions(userId) {
        const ses = await this.secDevRepository
            .createQueryBuilder("s")
            .select(`"ip","title",s."lastActiveDate",s."deviceId"`)
            .where("s.userId = :userId", { userId })
            .andWhere("s.isActive = true")
            .execute();
        return ses;
    }
    async checkUserSession(deviceId) {
        const ses = await this.secDevRepository
            .createQueryBuilder("s")
            .select()
            .where("s.deviceId = :deviceId", { deviceId })
            .getOne();
        return ses;
    }
    async checkSession(dto) {
        const { userId, title, ip } = dto;
        const ses = await this.dataSource.query(`
            select s."deviceId" from public."SecurityDevices" s
            where s."userId" = $1 AND s."title" = $2 AND s."ip" = $1;
        `, [userId, title, ip]);
        if (ses[0])
            return ses[0];
        return null;
    }
    async checkActiveSession(deviceId) {
        const device = await this.secDevRepository
            .createQueryBuilder("s")
            .select()
            .where("s.deviceId = :id", { id: deviceId })
            .getOne();
        if (!device || !device.isActive)
            return false;
        return true;
    }
    async deleteDeviceSession(deviceId) {
        const deletedItem = await this.secDevRepository
            .createQueryBuilder()
            .delete()
            .from(securityDevices_entity_1.SecurityDevices)
            .where("deviceId = :id", { id: deviceId })
            .execute();
        if (deletedItem.affected === 1)
            return true;
        return false;
    }
    async deactivateSession(deviceId) {
        const ses = await this.secDevRepository
            .createQueryBuilder()
            .update(securityDevices_entity_1.SecurityDevices)
            .set({ isActive: false })
            .where("deviceId = :id", { id: deviceId })
            .execute();
        return true;
    }
    async changeActiveDate(deviceId) {
        const ses = await this.secDevRepository
            .createQueryBuilder()
            .update(securityDevices_entity_1.SecurityDevices)
            .set({ lastActiveDate: new Date().toISOString() })
            .where("deviceId = :id", { id: deviceId })
            .execute();
        return true;
    }
    async deleteAllsessionBesideCurrent(deviceId, userId) {
        const result = await this.secDevRepository
            .createQueryBuilder()
            .delete()
            .from(securityDevices_entity_1.SecurityDevices)
            .where("userId = :userId AND deviceId <> :deviceId", { userId, deviceId })
            .execute();
        return true;
    }
    async deleteAllData() {
        await this.secDevRepository
            .createQueryBuilder()
            .delete()
            .from(securityDevices_entity_1.SecurityDevices)
            .execute();
        return true;
    }
};
exports.SecurityDevicesSqlRepository = SecurityDevicesSqlRepository;
exports.SecurityDevicesSqlRepository = SecurityDevicesSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(securityDevices_entity_1.SecurityDevices)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], SecurityDevicesSqlRepository);
//# sourceMappingURL=securityDevicesSql.repository.js.map