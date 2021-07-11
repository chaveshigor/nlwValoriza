import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

export async function ensureUserExists (req: Request, res: Response, next: NextFunction) {
    const userRepository = getCustomRepository(UserRepositories)
    const { email } = req.body
    const userToVerify = await userRepository.findOne({
        where: {email}
    })

    if(!userToVerify) {
        return res.status(404).json({
            status: "error",
            description: "User not found"
        })
    }

    req.user_id = userToVerify.id
    req.user_email = userToVerify.email
    req.user_name = userToVerify.name

    return next()
}