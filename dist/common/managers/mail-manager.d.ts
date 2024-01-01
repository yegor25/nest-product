declare class MailManager {
    registerConfirmation(email: string, code: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    passRecovery(email: string, code: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
export declare const mailManager: MailManager;
export {};
