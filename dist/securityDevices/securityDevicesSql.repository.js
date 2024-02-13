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
let SecurityDevicesSqlRepository = class SecurityDevicesSqlRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async create(dto) {
        const { ip, title, lastActiveDate, deviceId, isActive, userId } = dto;
        const newSes = await this.dataSource.query(`
            insert into public."SecurityDevices"
            ("ip","title","lastActiveDate","deviceId","isActive","userId")
            values($1,$2,$3,$4,$5,$6)
            returning*;
        `, [ip, title, lastActiveDate, deviceId, isActive, userId]);
        return newSes[0];
    }
    async getSession(deviceId) {
        const ses = await this.dataSource.query(`
            select s."ip",s."title",s."lastActiveDate",s."deviceId" from public."SecurityDevices" s
            where s."deviceId" = $1;
        `, [deviceId]);
        return ses[0];
    }
    async getAllSessions(userId) {
        const ses = await this.dataSource.query(`
            select s."ip",s."title",s."lastActiveDate",s."deviceId" from public."SecurityDevices" s
            where s."userId" = $1 AND s."isActive" = 'true';
        `, [userId]);
        return ses;
    }
    async checkUserSession(deviceId) {
        const ses = await this.dataSource.query(`
            select * from public."SecurityDevices" s
            where s."deviceId" = $1;
        `, [deviceId]);
        return ses[0];
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
        const device = await this.dataSource.query(`
            select * from public."SecurityDevices" s
            where s."deviceId" = $1;
        `, [deviceId]);
        if (!device[0] || !device[0].isActive)
            return false;
        return true;
    }
    async deleteDeviceSession(deviceId) {
        const deletedItem = await this.dataSource.query(`
            delete from public."SecurityDevices" s
            where s."deviceId" = $1
        `, [deviceId]);
        console.log("del", deletedItem);
        if (deletedItem[1] === 1)
            return true;
        return false;
    }
    async deactivateSession(deviceId) {
        const ses = await this.dataSource.query(`
            update public."SecurityDevices" as s
            set "isActive" = 'false'
            where s."deviceId" = $1
            returning *;
        `, [deviceId]);
        return true;
    }
    async changeActiveDate(deviceId) {
        const ses = await this.dataSource.query(`
        update public."SecurityDevices" as s
        set "lastActiveDate" = '${new Date().toISOString()}'
        where s."deviceId" = $1
        returning *;
        `, [deviceId]);
        return true;
    }
    async deleteAllsessionBesideCurrent(deviceId, userId) {
        const result = await this.dataSource.query(`
            delete from public."SecurityDevices" as s
            where s."userId" = $1 AND s."deviceId" <> $2;
        `, [userId, deviceId]);
        return true;
    }
    async deleteAllData() {
        const deleted = await this.dataSource.query(`
            delete from public."SecurityDevices";
        `);
        return true;
    }
};
exports.SecurityDevicesSqlRepository = SecurityDevicesSqlRepository;
exports.SecurityDevicesSqlRepository = SecurityDevicesSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], SecurityDevicesSqlRepository);
//# sourceMappingURL=securityDevicesSql.repository.js.map