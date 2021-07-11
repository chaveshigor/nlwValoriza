import { Request, Response } from "express";
import { GenerateTokenToRecoverPasswordService } from "../services/GenerateTokenService";
import { SendEmailService } from "../services/SendEmailService";

class GenerateTokenToRecoverPasswordController {
    async handle(req: Request, res: Response) {
        const { user_id, user_email, user_name } = req

        // Generate token
        const tokenService = new GenerateTokenToRecoverPasswordService()
        const token = await tokenService.execute(user_id)

        // Send token by email
        const sendEmailService = new SendEmailService()
        await sendEmailService.sendTokenToResetPassword(token, user_name, user_email)

        return res.status(200).send()
    }
}

export { GenerateTokenToRecoverPasswordController }