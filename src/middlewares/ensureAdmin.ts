import { Request, Response, NextFunction } from "express"
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { ErrorHandler } from "../services/HandlingErrors"

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    
    const { user_id } = req
    const userRepository = getCustomRepository(UserRepositories)
    const user = await userRepository.findOne(user_id)

    if(!user) {
        throw new ErrorHandler("Invalid user", 400)
    }

    const admin = user.admin

    if(admin){
        return next()
    }

    return res.status(401).json({
        status: "unauthorized",
        description: "You are not an admin"
    })
}