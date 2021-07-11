import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class ResetPasswordController {
    async handle(req: Request, res: Response) {
        const { user_id } = req
        const { token, newPassword } = req.body

        const resetPasswordService = new ResetPasswordService()
        await resetPasswordService.execute({user_id, token, newPassword})

        return res.status(200).send()
    }
}

export { ResetPasswordController }