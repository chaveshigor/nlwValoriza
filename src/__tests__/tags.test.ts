import request from "supertest"
import { app } from "../server"
import { getConnection, createConnection } from "typeorm"

async function createUser(name: string, email: string, password: string, admin: boolean) {
    const response = await request(app).post("/users").send({
        name,
        email,
        password,
        admin
    })

    return response
}

async function authUser(email: string, password: string) {
    const response = await request(app).post("/auth").send({
        email,
        password
    })

    return response
}

describe("Testing the tags features", () => {

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

    it("Should create a new tag by an admin user", async() => {
        await createUser("Higor", "higor@gmail.com", "123456", true)
        const { body } = await authUser("higor@gmail.com", "123456")
        const token = body.token

        const newTag = await request(app).post("/tags").send({
            name: "tag de teste"
        }).set("Authorization", `Token ${token}`)

        const repeatedTag = await request(app).post("/tags").send({
            name: "tag de teste"
        }).set("Authorization", `Token ${token}`)

        expect(newTag.statusCode).toBe(200)
        expect(repeatedTag.statusCode).toBe(400)
    })

})