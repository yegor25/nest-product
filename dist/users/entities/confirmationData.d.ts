import { Users } from "./user.entity";
export declare class ConfirmationData {
    userId: string;
    code: string;
    expirationDate: Date;
    user: Users;
}
