export declare class Users {
    id: string;
    email: string;
    login: string;
    createdAt: string;
    passwordSalt: string;
    passwordHash: string;
    isActiveAccount: boolean;
    confirmationData: ConfirmationData;
}
export declare class ConfirmationData {
    id: string;
    userId: string;
    code: string;
    expirationDate: Date;
    a: string;
    user: Users;
}
