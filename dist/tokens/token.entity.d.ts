import { Users } from "../users/entities/user.entity";
export type tokenDbType = {
    token: string;
};
export declare class Tokens {
    id: string;
    token: string;
    userId: string;
    user: Users;
}
