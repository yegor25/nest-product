import nodemailer from "nodemailer";
declare class MailAdapter {
    transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    send(email: string, subject: string, message: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
export declare const mailAdapter: MailAdapter;
export {};
