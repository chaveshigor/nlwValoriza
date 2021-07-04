import { getCustomRepository } from "typeorm"
import { TagRepositories } from "../repositories/TagRepositories"
import { ErrorHandler } from '../services/HandlingErrors'

interface ITagRequest {
    name: string
}

class CreateTagService {

    async execute({name}: ITagRequest) {
        const tagRepository = getCustomRepository(TagRepositories)

        if(!name) {
            throw new ErrorHandler("A name must be provided", 400)
        }

        const tagAlreadyExist = await tagRepository.findOne({name})

        if(tagAlreadyExist) {
            throw new ErrorHandler("Tag already exists", 400)
        }

        const newTag = tagRepository.create({
            name
        })
        
        await tagRepository.save(newTag)

        return newTag
    }

}

export { CreateTagService }