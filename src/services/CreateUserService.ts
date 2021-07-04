import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { ErrorHandler } from "../services/HandlingErrors"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string,
    email: string,
    password: string,
    admin?: boolean
}

class CreateUserService {

    async execute({name, email, password, admin}: IUserRequest) {
        const usersRepository = getCustomRepository(UserRepositories)

        if(!email) {
            throw new ErrorHandler("An email must be provided", 400)
        }

        if(!password) {
            throw new ErrorHandler("A password must be provided", 400)
        }

        const userAlreadyExist = await usersRepository.findOne({email})
        
        if (userAlreadyExist) {
            throw new ErrorHandler("User already exists", 400)
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        })

        await usersRepository.save(user)
        delete user.password        
        return user
    }
}

export { CreateUserService }