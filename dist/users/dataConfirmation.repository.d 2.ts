import { DataSource, Repository } from "typeorm";
import { EmailConfirmation } from "./user.schema";
import { ConfirmationData } from "./entities/confirmationData";
export declare class DataConfirmationRepository {
    protected dataSource: DataSource;
    protected confDataRepo: Repository<ConfirmationData>;
    constructor(dataSource: DataSource, confDataRepo: Repository<ConfirmationData>);
    save(code: string, userId: string): Promise<string>;
    changeCode(confirmationData: EmailConfirmation, userId: string): Promise<string>;
}
