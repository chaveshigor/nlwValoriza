import { createTransport } from "nodemailer"

async function sendEmail(emailDestiny: string, emailHtml: string, emailSubject: string) {
    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })


    const email = await transporter.sendMail({
        from: process.env.EMAIL_ADDR,
        to: emailDestiny,
        subject: emailSubject,
        html: emailHtml,
    })


    return email
}

export { sendEmail }