import request from "supertest"
import { app } from "../server"
import { getConnection, createConnection } from "typeorm"

async function createUser() {
    const response = await request(app).post("/users").send({
        name: "Higor",
        email: "higor@gmail.com",
        password: "123456",
        admin: true
    })

    return response
}

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
        const res = await createUser()
        expect(res.statusCode).toBe(200)
    })

    it('should create a user that already exist and expect an error', async() => {
        const res = await createUser()
        expect(res.statusCode).toBe(200)

        const res2 = await createUser()
        expect(res2.statusCode).toBe(400)
    })
})