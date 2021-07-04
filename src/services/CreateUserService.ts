import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { ErrorHandler } from '../services/HandlingErrors'

interface IUserRequest {
    name: string,
    email: string,
    admin?: boolean
}

class CreateUserService {

    async execute({name, email, admin}: IUserRequest) {
        const usersRepository = getCustomRepository(UserRepositories)

        if(!email) {
            throw new ErrorHandler("An email must be provided", 402)
            //throw new Error("Email incorrect")
        }

        const userAlreadyExist = await usersRepository.findOne({email})
        
        if (userAlreadyExist) {
            throw new ErrorHandler("User already exists", 404)
            //throw new Error("User already exists")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user)
        
        return user
    }
}

export { CreateUserService }