import { Request, Response } from "express"
import { AuthUserService } from "../services/AuthUserService"

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const authUserService = new AuthUserService()
        const token = await authUserService.execute(email, password)

        return res.status(200).json({token})
    }
}

export { AuthUserController }