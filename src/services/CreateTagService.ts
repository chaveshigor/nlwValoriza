import { getCustomRepository } from "typeorm"
import { TagRepositories } from "../repositories/TagRepositories"

interface ITagRequest {
    name: string
}

class CreateTagService {

    async execute({name}: ITagRequest) {
        const tagRepository = getCustomRepository(TagRepositories)

        if(!name) {
            throw new Error("A name must be provided")
        }

        const tagAlreadyExist = await tagRepository.findOne({name})

        if(tagAlreadyExist) {
            throw new Error("Tag alreary exists")
        }

        const newTag = tagRepository.create({
            name
        })
        
        await tagRepository.save(newTag)

        return newTag
    }

}

export { CreateTagService }