import { DataSource } from "typeorm";
export declare class TokenSqlRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    save(token: string, userId: string): Promise<void>;
    findTokenByUserId(userId: string, token: string): Promise<boolean>;
}
