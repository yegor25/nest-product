import { DataSource, Repository } from "typeorm";
import { Tokens } from "./token.entity";
export declare class TokenSqlRepository {
    protected dataSource: DataSource;
    protected tokenRepo: Repository<Tokens>;
    constructor(dataSource: DataSource, tokenRepo: Repository<Tokens>);
    save(token: string, userId: string): Promise<void>;
    findTokenByUserId(userId: string, token: string): Promise<boolean>;
}
