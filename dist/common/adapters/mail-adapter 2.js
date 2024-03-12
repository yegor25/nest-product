"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailAdapter {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "itvolear@gmail.com",
                pass: "jckm kpux qswi tltc"
            }
        });
    }
    async send(email, subject, message) {
        let info = await this.transporter.sendMail({
            from: "itvolear@gmail.com",
            to: email,
            subject: subject,
            html: message
        });
        console.log("info", info);
        return info;
    }
}
exports.mailAdapter = new MailAdapter();
//# sourceMappingURL=mail-adapter.js.map