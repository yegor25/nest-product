import { DataSource } from "typeorm";
export declare class DataConfirmationRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    save(code: string, userId: string): Promise<string>;
}
