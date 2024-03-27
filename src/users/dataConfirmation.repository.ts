import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { EmailConfirmation, confirmationDataType } from "./user.schema";
import { addDays } from "date-fns";
import { ConfirmationData } from "./entities/confirmationData";

@Injectable()
export class DataConfirmationRepository {
    constructor(
        @InjectDataSource() protected dataSource: DataSource,
        @InjectRepository(ConfirmationData) protected confDataRepo: Repository<ConfirmationData>
    ){}

    async save(code: string,userId: string):Promise<string>{
        // const data = await this.dataSource.query<{code: string}[]>(`
        //     insert into public."ConfirmationData"
        //     ("userId","code","expirationDate")
        //     values('${userId}','${code}','${addDays(new Date(),3).toISOString().split("T")[0]}')
        //     returning code
        //     ;
        // `)
        // return data[0].code
        const data = await this.confDataRepo.createQueryBuilder()
        .insert()
        .into(ConfirmationData)
        .values({userId,code, expirationDate: addDays(new Date(),3).toISOString()})
        .returning("code")
        .execute()

        return data.raw[0].code
    }
    async changeCode(confirmationData: EmailConfirmation,userId: string):Promise<string>{
        const {code,expirationDate} = confirmationData
        // const newData = await this.dataSource.query<{code: string}[]>(`
        // update public."ConfirmationData" as c
        // set "code" = $1,
        // "expirationDate" = $3
        // where c."userId" = $2
        // returning code;
        // `,[code,userId, expirationDate])
        // return newData[0].code
        const data = await this.confDataRepo.createQueryBuilder()
        .update(ConfirmationData)
        .set({code,expirationDate})
        .where("userId = :userId",{userId})
        .returning("code")
        .execute()

        return data.raw[0].code
    }
}