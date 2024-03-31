import { Users } from "src/users/entities/user.entity";
export declare class Blog {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    websiteUrl: string;
    isMembership: boolean;
    user: Users;
}
