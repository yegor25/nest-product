import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
  createSecurityDevicesDto,
  securityDevicesInputType,
  securityDevicesSqlDbType,
  securityDevicesViewType,
} from "./securityDevices.schema";
import { SecurityDevices } from "./securityDevices.entity";

@Injectable()
export class SecurityDevicesSqlRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    @InjectRepository(SecurityDevices)
    protected secDevRepository: Repository<SecurityDevices>
  ) {}
  async create(dto: createSecurityDevicesDto) {
    const { ip, title, lastActiveDate, deviceId, isActive, userId } = dto;
    // const newSes = await this.dataSource.query(`
    //     insert into public."SecurityDevices"
    //     ("ip","title","lastActiveDate","deviceId","isActive","userId")
    //     values($1,$2,$3,$4,$5,$6)
    //     returning*;
    // `,[ip,title,lastActiveDate,deviceId,isActive,userId])
    const newSes = await this.secDevRepository
      .createQueryBuilder()
      .insert()
      .into(SecurityDevices)
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
  async getSession(deviceId: string): Promise<securityDevicesViewType> {
    // const ses = await this.dataSource.query<securityDevicesViewType[]>(`
    //     select s."ip",s."title",s."lastActiveDate",s."deviceId" from public."SecurityDevices" s
    //     where s."deviceId" = $1;
    // `,[deviceId])
    const ses = await this.secDevRepository
      .createQueryBuilder("s")
      .select(["s.ip", "s.title", "s.lastActiveDate", "s.deviceId"])
      .where("s.deviceId = :id", { id: deviceId })
      .execute();
    console.log("ses", ses);
    return ses;
  }
  async getAllSessions(userId: string): Promise<securityDevicesViewType[]> {
    // const ses = await this.dataSource.query<securityDevicesViewType[]>(`
    //     select s."ip",s."title",s."lastActiveDate",s."deviceId" from public."SecurityDevices" s
    //     where s."userId" = $1 AND s."isActive" = 'true';
    // `,[userId])
    const ses = await this.secDevRepository
      .createQueryBuilder("s")
      .select(`"ip","title",s."lastActiveDate",s."deviceId"`)
      .where("s.userId = :userId", { userId })
      .andWhere("s.isActive = true")
      .execute();
    return ses;
  }

  async checkUserSession(deviceId: string) {
    // const ses = await this.dataSource.query<securityDevicesSqlDbType[]>(`
    //     select * from public."SecurityDevices" s
    //     where s."deviceId" = $1;
    // `,[deviceId])
    const ses = await this.secDevRepository
      .createQueryBuilder("s")
      .select()
      .where("s.deviceId = :deviceId", { deviceId })
      .getOne();

    return ses;
  }
  async checkSession(dto: securityDevicesInputType): Promise<string | null> {
    const { userId, title, ip } = dto;
    const ses = await this.dataSource.query(
      `
            select s."deviceId" from public."SecurityDevices" s
            where s."userId" = $1 AND s."title" = $2 AND s."ip" = $1;
        `,
      [userId, title, ip]
    );
    if (ses[0]) return ses[0];
    return null;
  }
  async checkActiveSession(deviceId: string): Promise<boolean> {
    // const device = await this.dataSource.query<securityDevicesSqlDbType[]>(`
    //     select * from public."SecurityDevices" s
    //     where s."deviceId" = $1;
    // `,[deviceId])
    const device = await this.secDevRepository
      .createQueryBuilder("s")
      .select()
      .where("s.deviceId = :id", { id: deviceId })
      .getOne();
    if (!device || !device.isActive) return false;
    return true;
  }
  async deleteDeviceSession(deviceId: string): Promise<boolean> {
    // const deletedItem = await this.dataSource.query(`
    //     delete from public."SecurityDevices" s
    //     where s."deviceId" = $1
    // `,[deviceId])
    const deletedItem = await this.secDevRepository
      .createQueryBuilder()
      .delete()
      .from(SecurityDevices)
      .where("deviceId = :id", { id: deviceId })
      .execute();
    if (deletedItem.affected === 1) return true;
    return false;
  }
  async deactivateSession(deviceId: string): Promise<boolean> {
    // const ses = await this.dataSource.query(
    //   `
    //         update public."SecurityDevices" as s
    //         set "isActive" = 'false'
    //         where s."deviceId" = $1
    //         returning *;
    //     `,
    //   [deviceId]
    // );
    const ses = await this.secDevRepository
      .createQueryBuilder()
      .update(SecurityDevices)
      .set({ isActive: false })
      .where("deviceId = :id", { id: deviceId })
      .execute();

    return true;
  }

  async changeActiveDate(deviceId: string) {
    // const ses = await this.dataSource.query(
    //   `
    //     update public."SecurityDevices" as s
    //     set "lastActiveDate" = '${new Date().toISOString()}'
    //     where s."deviceId" = $1
    //     returning *;
    //     `,
    //   [deviceId]
    // );
    const ses = await this.secDevRepository
      .createQueryBuilder()
      .update(SecurityDevices)
      .set({ lastActiveDate: new Date().toISOString() })
      .where("deviceId = :id", { id: deviceId })
      .execute();
    return true;
  }
  async deleteAllsessionBesideCurrent(
    deviceId: string,
    userId: string
  ): Promise<boolean> {
    // const result = await this.dataSource.query(
    //   `
    //         delete from public."SecurityDevices" as s
    //         where s."userId" = $1 AND s."deviceId" <> $2;
    //     `,
    //   [userId, deviceId]
    // );
    const result = await this.secDevRepository
      .createQueryBuilder()
      .delete()
      .from(SecurityDevices)
      .where("userId = :userId AND deviceId <> :deviceId", { userId, deviceId })
      .execute();
    return true;
  }
  async deleteAllData(): Promise<boolean> {
    // const deleted = await this.dataSource.query(`
    //         delete from public."SecurityDevices";
    //     `);
    await this.secDevRepository
      .createQueryBuilder()
      .delete()
      .from(SecurityDevices)
      .execute();
    return true;
  }
}
