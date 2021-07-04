import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"


class ListUserSendedComplimentsService {
    async execute(id: string) {
        const complimentsRepository = getCustomRepository(ComplimentRepositories)

        const compliments = await complimentsRepository.find({
            where: {
                user_sender: id
            }
        })
        
        return compliments
    }
}

export { ListUserSendedComplimentsService }