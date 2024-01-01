//jckm kpux qswi tltc
import nodemailer from "nodemailer"




class MailAdapter {
   
    transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "itvolear@gmail.com",
                    pass: "jckm kpux qswi tltc"
                }
            })
    
   async  send(email: string,subject: string,message: string) {
        let info = this.transporter.sendMail({
            from: "itvolear@gmail.com",
            to: email,
            subject: subject,
            html: message
        })
        console.log("info", info)
        return info
    }
}
export const mailAdapter = new MailAdapter()