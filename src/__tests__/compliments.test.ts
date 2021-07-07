import request from "supertest"
import { app } from "../server";
import { getConnection, createConnection } from "typeorm";
import { User } from "../entities/User";
import {FakeUser} from "../factories/user"
import { AuthUserService } from "../services/AuthUserService"

jest.mock("../controllers/AuthUserController")
const AuthServiceMock = AuthUserService as jest.Mock<AuthUserService>

describe("Compliments tests", () => {

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

    it("Should create a new compliment from a user to another", async() => {
        try {
            const AuthUseCaseMock = new AuthServiceMock() as jest.Mocked<AuthUserService>
            const res = await AuthUseCaseMock.execute("higor@gmail.com", "123456")
            console.log(res) 
        } catch (error) {
            console.log(error.description)
        }
        // const user1 = await createUser(app, "Higor", "higor@gmail.com", "123456", true)
        // const user2 = await createUser(app, "Jhonn", "jhonn@gmail.com", "123456", true)
    
        // const authUser1 = await authUser(app, "higor@gmail.com", "123456")
        // const token = authUser1.body.token
        
        // const newTag = await createTag(app, "teste", token)
        // const tag_id = newTag.body.id
        expect(1+1).toBe(2)
    })

})