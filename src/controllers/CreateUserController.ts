import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"
import { UserRepositories } from "../repositories/UserRepositories"
import { getCustomRepository } from "typeorm"

class CreateUserController {
    async handle(req: Request, res: Response) {
        
        const { name, email, admin, password } = req.body
        const createUserService = new CreateUserService()
        const userRepository = getCustomRepository(UserRepositories)
        const user = await createUserService.execute({name, email, password, admin}, userRepository)
        
        return res.status(200).json(user)
    }
}

export { CreateUserController }