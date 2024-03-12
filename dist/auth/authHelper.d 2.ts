import { EmailConfirmation } from "../users/user.schema";
declare class AuthHelper {
    confiramtionDataMapper(): EmailConfirmation;
}
export declare const authHelper: AuthHelper;
export {};
