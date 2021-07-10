import { Request, Response } from "express"
import { AuthUserService } from "../services/AuthUserService"
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const authUserService = new AuthUserService()
        const userReporitory = getCustomRepository(UserRepositories)
        const token = await authUserService.execute(email, password, userReporitory)

        return res.status(200).json({token})
    }
}

export { AuthUserController }