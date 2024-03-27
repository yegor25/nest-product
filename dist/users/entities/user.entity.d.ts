import { ConfirmationData } from "./confirmationData";
import { SecurityDevices } from "../../securityDevices/securityDevices.entity";
export declare class Users {
    id: string;
    email: string;
    login: string;
    createdAt: string;
    passwordSalt: string;
    passwordHash: string;
    isActiveAccount: boolean;
    confirmationData: ConfirmationData;
    securityDevices: SecurityDevices[];
}
