import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"


class ListUserReceivedComplimentsService {
    async execute(id: string) {
        const complimentsRepository = getCustomRepository(ComplimentRepositories)

        const compliments = await complimentsRepository.find({
            where: {
                user_receiver: id
            },
            relations: ["userSender", "userReceiver"]
        })
        
        return compliments
    }
}

export { ListUserReceivedComplimentsService }