import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"
import { UserRepositories } from "../repositories/UserRepositories"
import { TagRepositories } from "../repositories/TagRepositories"
import { ErrorHandler } from "./HandlingErrors"

interface ICompliment {
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}

class CreateComplimentService {
    async execute({tag_id, user_sender, user_receiver, message}: ICompliment) {
        const complimentRepository = getCustomRepository(ComplimentRepositories)
        const userRepository = getCustomRepository(UserRepositories)
        const tagRepository = getCustomRepository(TagRepositories)

        const checkVariableContent = (param: string, errorMessage: string) => {
            if(!param) {
                throw new ErrorHandler(errorMessage, 400)
            }
        }

        checkVariableContent(tag_id, "A tag must be provided")
        checkVariableContent(user_sender, "An user sender must be provided")
        checkVariableContent(user_receiver, "An user receiver must be provided")
        checkVariableContent(message, "A message must be provided")

        if(user_receiver === user_sender) {
            throw new ErrorHandler("You cannot give to yourself a compliment", 400)
        }

        const checkIfUserItsValid = async(repo: Repository<User>, id: string, errorMessage: string) => {
            const user = await repo.findOne(id)

            if(!user) {
                throw new ErrorHandler(errorMessage, 400)
            }
        }

        await checkIfUserItsValid(userRepository, user_sender, "Invalid user sender")
        await checkIfUserItsValid(userRepository, user_receiver, "Invalid user receiver")

        const validTag = await tagRepository.findOne(tag_id)

        if(!validTag) {
            throw new ErrorHandler("Invalid tag", 400)
        }

        const newComplement = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentRepository.save(newComplement)
        return newComplement
    }
}

export { CreateComplimentService }