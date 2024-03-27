import { Users } from "../users/entities/user.entity";
export declare class SecurityDevices {
    id: string;
    userId: string;
    ip: string;
    title: string;
    lastActiveDate: string;
    deviceId: string;
    isActive: boolean;
    user: Users;
}
