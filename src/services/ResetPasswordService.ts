import { getCustomRepository } from "typeorm"
import { hash } from "bcryptjs"
import { TokenToRecoverPasswordRepositories } from "../repositories/TokenToRecoverPasswordRepositories"
import { UserRepositories } from "../repositories/UserRepositories"
import { ErrorHandler } from "./HandlingErrors"

interface IResetPasswordData {
    user_id: string,
    token: string,
    newPassword: string
}

class ResetPasswordService {
    async execute({user_id, token, newPassword}: IResetPasswordData) {
        const userRepository = getCustomRepository(UserRepositories)
        const tokenRepository = getCustomRepository(TokenToRecoverPasswordRepositories)

        const verifyToken = await tokenRepository.findOne({
            where: {user_id, token}
        })

        // Verify if the token was founded
        if(!verifyToken) {
            throw new ErrorHandler("Wrong token", 400)
        }

        await tokenRepository.remove(verifyToken)

        const passwordHash = await hash(newPassword, 8)
        userRepository.update(user_id, {
            password: passwordHash
        })
    }
}

export { ResetPasswordService }