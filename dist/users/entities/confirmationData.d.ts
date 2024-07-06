import { Users } from "./user.entity";
export declare class ConfirmationData {
    id: string;
    userId: string;
    code: string;
    expirationDate: Date;
    user: Users;
}
