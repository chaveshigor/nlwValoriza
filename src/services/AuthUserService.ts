import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { compare, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { ErrorHandler } from "./HandlingErrors"

class AuthUserService {
    async execute(email: string, password: string, userReporitory: UserRepositories) {
        //const userReporitory = getCustomRepository(UserRepositories)

        // Verify if the needed info was received
        if(!email) {
            throw new ErrorHandler("An email must be provided", 400)
        }

        if(!password) {
            throw new ErrorHandler("A password must be provided", 400)
        }
        
        // Verify if the user exist
        const validUser = await userReporitory.findOne({email})

        if(!validUser) {
            throw new ErrorHandler("Email or Password incorrect", 400)
        }

        // Verify if the password are correct
        const passwordIsCorrect = await compare(password, validUser.password)
        
        if(!passwordIsCorrect) {
            throw new ErrorHandler("Email or Password incorrect", 400)
        }

        // Generate token
        const token = sign({
            email: validUser.email
        }, process.env.SECRET_KEY_TO_JWT, {
            subject: validUser.id,
            expiresIn: "1d"
        })
        
        return token
    }
}

export { AuthUserService }