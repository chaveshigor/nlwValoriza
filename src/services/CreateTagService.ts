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

        if(name.length === 0) {
            throw new Error("The name length must be grater than zero")
        }

        const newTag = tagRepository.create({
            name
        })
        
        await tagRepository.save(newTag)

        return newTag
    }

}

export { CreateTagService }