import request from "supertest"
import { app } from "../server"
import { getConnection, createConnection } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { CreateUserService } from "../services/CreateUserService"

jest.mock("../repositories/UserRepositories")
const userRepository = UserRepositories as jest.Mock<UserRepositories>
//userRepository
const repo = new userRepository()
repo.create = jest.fn().mockImplementation(() => {
    return {
        name: "higor"
    }
})
userRepository.getMockImplementation

describe("User features tests", () => {

    beforeEach(async() => {
        const connection = await createConnection()
        const entities = connection.entityMetadatas

        entities.map(async(entity) => {
            const repository = connection.getRepository(entity.name)
            await repository.query(`DELETE FROM ${entity.tableName}`)
        })
    })
    
    afterEach(async() => {        
        await getConnection().close()
    })
    
    it('should create a new user', async() => {
        
        const service = new CreateUserService()
        const newUser = service.execute({name: "higor", email: "higor@gmail.com", password: "123456", admin: true}, repo)
        
        expect(newUser).toContain("higor")
    })

})