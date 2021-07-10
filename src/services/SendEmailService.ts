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
            const html = readHtml("email.html", username, replacements)
            const email = await sendEmail(emailDestiny, html, "Chegou um novo elogio para você :)")
            return email
        } catch (error) {
            throw new ErrorHandler("The email could not be sended", 500)
        }
    }


}


export { SendEmailService }