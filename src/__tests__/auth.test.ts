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

describe("Auth tests", () => {

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

    it("Should auth an user", async() => {

        await createUser()
        
        const response = await request(app).post("/auth").send({
            email: "higor@gmail.com",
            password: "123456",
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.token.length).toBeGreaterThan(10)
    })

})

