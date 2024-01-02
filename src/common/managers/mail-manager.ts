import { mailAdapter } from "../adapters/mail-adapter"




class MailManager {
    async registerConfirmation(email: string, code: string){
        console.log("code", code)
        const subject = "Активация вашего аккаунта в системе"
        const message = `<h1>Thank for your registration</h1>
                        <p>To finish registration please follow the link below:
                    <a href='https://yandex.ru?code=${code}>complete registration</a>
                    </p>`
        return  mailAdapter.send(email,subject,message)
    }
   
    async passRecovery(email: string, code: string){
        const message =  `
        <h1>Password recovery</h1>
        <p>To finish password recovery please follow the link below:
           <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>
       </p>
       `
     return mailAdapter.send(email, "Восстановление пароля",message)
    }
}

export const mailManager = new MailManager()