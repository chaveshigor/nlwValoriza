import { Request, Response } from "express"
import { CreateComplimentService } from "../services/CreateComplimentService"
import { SendEmailService } from "../services/SendEmailService"
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { TagRepositories } from "../repositories/TagRepositories"


class CreateComplimentController {
    async handle(req: Request, res: Response){
        const { tag_id, user_receiver, message } = req.body
        const { user_id } = req
        const createComplimentService = new CreateComplimentService()
        const compliment = await createComplimentService.execute({tag_id, user_sender: user_id, user_receiver, message})

        res.status(200).json(compliment)
        
        const userReporitory = getCustomRepository(UserRepositories)
        const tagRepository = getCustomRepository(TagRepositories)

        const { email, name } = await userReporitory.findOne(user_receiver)
        const { name: tagname } = await tagRepository.findOne(tag_id)

        const emailService = new SendEmailService()
        await emailService.sendNewComplimentEmail(
            name,
            tagname,
            compliment.message,
            email
        )
        
        return 
    }
}

export { CreateComplimentController }