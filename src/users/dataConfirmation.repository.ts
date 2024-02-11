import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { EmailConfirmation, confirmationDataType } from "./user.schema";
import { addDays } from "date-fns";

@Injectable()
export class DataConfirmationRepository {
    constructor(
        @InjectDataSource() protected dataSource: DataSource
    ){}

    async save(code: string,userId: string):Promise<string>{
        const data = await this.dataSource.query<{code: string}[]>(`
            insert into public."ConfirmationData"
            ("userId","code","expirationDate")
            values('${userId}','${code}','${addDays(new Date(),3).toISOString().split("T")[0]}')
            returning code
            ;
        `)
        return data[0].code
    }
    async changeCode(confirmationData: EmailConfirmation,email: string):Promise<string>{
        const {code,expirationDate} = confirmationData
        const newData = await this.dataSource.query<{code: string}[]>(`
        update public."ConfirmationData" as c
        set "code" = $1,
        "expirationDate" = $3
        where c."email" = $2
        returning code;
        `,[code,email, expirationDate])
        return newData[0].code
    }
}