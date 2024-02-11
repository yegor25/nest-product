import { DataSource } from "typeorm";
import { EmailConfirmation } from "./user.schema";
export declare class DataConfirmationRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    save(code: string, userId: string): Promise<string>;
    changeCode(confirmationData: EmailConfirmation, email: string): Promise<string>;
}
