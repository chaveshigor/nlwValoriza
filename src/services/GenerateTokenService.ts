import { TokenToRecoverPasswordRepositories } from "../repositories/TokenToRecoverPasswordRepositories"
import { UserRepositories } from "../repositories/UserRepositories"
import { getCustomRepository } from "typeorm"

class GenerateTokenToRecoverPasswordService {
    async execute(user_id: string) {
        // Creating a function to add days
        function addDays(daysToAdd: number) {
            const today = new Date()
            const expireDate = new Date(today.setDate(today.getDate() + daysToAdd))
            return expireDate
        }

        // Verify if token exists
        const tokenRepository = getCustomRepository(TokenToRecoverPasswordRepositories)

        const verifyToken = await tokenRepository.findOne({
            where: {user_id}
        })

        if(verifyToken) {
            await tokenRepository.remove(verifyToken)
        }

        const newToken = Math.floor(Math.random() * 10000000000).toString()
        const expirationDate = addDays(1)

        // Saving the token
        const token = tokenRepository.create({
            user_id,
            expire_at: expirationDate,
            token: newToken
        })
        await tokenRepository.save(token)

        return newToken
    }
}

export { GenerateTokenToRecoverPasswordService }