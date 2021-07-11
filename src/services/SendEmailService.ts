import { sendEmail } from "../email/sendEmail"
import { ErrorHandler } from "./HandlingErrors"
import { readHtml } from "../email/readHtml"

class SendEmailService {
    async sendNewComplimentEmail(username: string, tagname: string, message: string, emailDestiny: string) {
        try {
            const replacements = {
                username: username[0].toUpperCase() + username.substr(1),
                message,
                tagname: tagname.toLowerCase()
            }
            const html = readHtml("email.html", replacements)
            const email = await sendEmail(emailDestiny, html, "Chegou um novo elogio para você :)")
            return email
        } catch (error) {
            throw new ErrorHandler("The email could not be sended", 500)
        }
    }

    async sendTokenToResetPassword(token: string, username: string, emailDestiny: string) {
        try {
            const replacements = {
                username: username[0].toUpperCase() + username.substr(1),
                token
            }
            const html = readHtml("tokenToResetPassword.html", replacements)
            const email = await sendEmail(emailDestiny, html, "Vimos que você esqueceu sua senha antiga :(")
            return email
        } catch (error) {
            throw new ErrorHandler("The email could not be sended", 500)
        }
    }
}


export { SendEmailService }