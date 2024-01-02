"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailManager = void 0;
const mail_adapter_1 = require("../adapters/mail-adapter");
class MailManager {
    async registerConfirmation(email, code) {
        console.log("code", code);
        const subject = "Активация вашего аккаунта в системе";
        const message = `<h1>Thank for your registration</h1>
                        <p>To finish registration please follow the link below:
                    <a href='https://some-front.com/confirm-registration?code=${code}>complete registration</a>
                    </p>`;
        return mail_adapter_1.mailAdapter.send(email, subject, message);
    }
    async passRecovery(email, code) {
        const message = `
        <h1>Password recovery</h1>
        <p>To finish password recovery please follow the link below:
           <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>
       </p>
       `;
        return mail_adapter_1.mailAdapter.send(email, "Восстановление пароля", message);
    }
}
exports.mailManager = new MailManager();
//# sourceMappingURL=mail-manager.js.map